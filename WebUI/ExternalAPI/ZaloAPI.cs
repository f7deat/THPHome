using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebUI.ExternalAPI.Interfaces;
using WebUI.ExternalAPI.Models;
using WebUI.Models.Settings;
using ZaloDotNetSDK;
using ZaloDotNetSDK.entities;

namespace WebUI.ExternalAPI;

public class ZaloAPI : IZaloAPI
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly HttpClient _client;

    public ZaloAPI(ApplicationDbContext context, IConfiguration configuration, HttpClient client)
    {
        _context = context;
        _configuration = configuration;
        _client = client;
    }

    private async Task<string?> GetAccessTokenAsync()
    {
        var setting = await _context.ApplicationSettings.FirstOrDefaultAsync(x => x.Key == "ZALO");
        if (setting == null) return string.Empty;
        var zalo = JsonConvert.DeserializeObject<ZaloSetting>(setting.Value);
        if (zalo == null) return string.Empty;

        var app_id = _configuration.GetSection("Zalo:app_id")?.Value ?? string.Empty;
        var secret_key = _configuration.GetSection("Zalo:secret_key")?.Value ?? string.Empty;
        _client.DefaultRequestHeaders.Add("secret_key", secret_key);
        _client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded");

        var content = new FormUrlEncodedContent(
        [
            new KeyValuePair<string, string>("refresh_token", zalo.RefreshToken),
                new KeyValuePair<string, string>("app_id", app_id),
                new KeyValuePair<string, string>("grant_type", "refresh_token"),
            ]);

        var response = await _client.PostAsync("https://oauth.zaloapp.com/v4/oa/access_token", content);
        if (!response.IsSuccessStatusCode) return string.Empty;

        var data = JsonConvert.DeserializeObject<ZaloTokenResponse>(await response.Content.ReadAsStringAsync());
        if (data == null || string.IsNullOrEmpty(data.RefreshToken)) return string.Empty;

        zalo.RefreshToken = data.RefreshToken;
        zalo.ExpiredDate = DateTime.Now.AddSeconds(data.ExpiresIn);
        setting.Value = JsonConvert.SerializeObject(zalo);
        _context.ApplicationSettings.Update(setting);
        await _context.SaveChangesAsync();

        return data.AccessToken;
    }

    public async Task CreateArticle(Post post)
    {
        try
        {
            var author = await _context.Users.FindAsync(post.CreatedBy);
            var accessToken = await GetAccessTokenAsync();
            if (string.IsNullOrEmpty(accessToken)) return;

            var client = new ZaloClient(accessToken);
            var response = client.createArticle(new Article
            {
                Title = post.Title,
                Status = ArticleStatus.HIDE,
                Description = post.Description,
                Cover = new CoverPhoto(post.Thumbnail, ArticleStatus.SHOW),
                Author = author?.Name ?? author?.UserName,
                Body =
                [
                    new ParagraphText(post.Content)
                ]
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
    }
}
