using ApplicationCore.Entities;
using Azure.Core;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebUI.Entities.Articles;
using WebUI.ExternalAPI.Interfaces;
using WebUI.ExternalAPI.Models;
using WebUI.Models.Settings;
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
        var http = new HttpClient();
        var app_id = _configuration.GetSection("Zalo:app_id")?.Value ?? string.Empty;
        var secret_key = _configuration.GetSection("Zalo:secret_key")?.Value ?? string.Empty;
        http.DefaultRequestHeaders.Add("secret_key", secret_key);
        http.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded");

        var content = new FormUrlEncodedContent(
        [
            new KeyValuePair<string, string>("refresh_token", zalo.RefreshToken),
            new KeyValuePair<string, string>("app_id", app_id),
            new KeyValuePair<string, string>("grant_type", "refresh_token"),
        ]);

        var response = await http.PostAsync("https://oauth.zaloapp.com/v4/oa/access_token", content);
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

    public async Task<string> CreateArticle(Post post)
    {
        try
        {
            var author = await _context.Users.FindAsync(post.CreatedBy);
            var accessToken = await GetAccessTokenAsync();
            if (string.IsNullOrEmpty(accessToken)) return "Không lấy được access token";
            if (string.IsNullOrEmpty(post.Thumbnail)) return "Cover không hợp lệ";
            if (string.IsNullOrEmpty(post.Description)) return "Mô tả không được để trống";
            if (string.IsNullOrEmpty(post.Content)) return "Nội dung không được để trống";
            var imageName = post.Thumbnail.Split('/').Last();
            var photo_url = post.Thumbnail.Replace(imageName, Uri.EscapeDataString(imageName));

            var http = new HttpClient();
            http.DefaultRequestHeaders.Add("access_token", accessToken);

            var api = "https://openapi.zalo.me/v2.0/article/create";

            var content = new
            {
                type = "normal",
                title = post.Title,
                author = author?.Name,
                description = post.Description,
                status = "hide",
                body = new[]
                {
                    new
                    {
                        type = "text",
                        content =" post.Content"
                    }
                },
                cover = new
                {
                    cover_type = "photo",
                    photo_url,
                    status = "show"
                }
            };

            var response = await http.PostAsJsonAsync(api, content);
            var result = JsonConvert.DeserializeObject<ZaloArticleResponse>(await response.Content.ReadAsStringAsync());
            if (result is null) return "Chia sẻ thất bại";
            if (result.Error != 0) return result.Message ?? string.Empty;
            if (string.IsNullOrEmpty(result.Data?.Token)) return "Token không trả về!";

            var verifyResult = await Verify(result.Data.Token, accessToken);
            if (string.IsNullOrEmpty(verifyResult))
            {
                await _context.ZaloArticles.AddAsync(new ZaloArticle
                {
                    PostId = post.Id,
                    Token = result.Data?.Token
                });
                await _context.SaveChangesAsync();
                return string.Empty;
            }

            return verifyResult;
        }
        catch (Exception ex)
        {
            return ex.ToString();
        }
    }

    public async Task<string?> Verify(string token, string accessToken = "")
    {
        try
        {
            var http = new HttpClient();
            http.DefaultRequestHeaders.Add("access_token", accessToken);
            var api = "https://openapi.zalo.me/v2.0/article/verify";
            var response = await http.PostAsJsonAsync(api, new
            {
                token
            });
            var result = JsonConvert.DeserializeObject<ZaloArticleResponse>(await response.Content.ReadAsStringAsync());
            return result?.Message;
        }
        catch (Exception ex)
        {
            return ex.ToString();
        }
    }
}
