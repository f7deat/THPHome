using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebUI.ExternalAPI.Interfaces;
using WebUI.Models.Settings;
using ZaloCSharpSDK;
using ZaloDotNetSDK;
using ZaloDotNetSDK.entities;

namespace WebUI.ExternalAPI;

public class ZaloAPI : IZaloAPI
{
    private readonly ApplicationDbContext _context;
    public ZaloAPI(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateArticle(Post post)
    {
        var setting = await _context.ApplicationSettings.FirstOrDefaultAsync(x => x.Key == "ZALO");
        if (setting == null) return;
        var zalo = JsonConvert.DeserializeObject<ZaloSetting>(setting.Value);
        if (zalo == null) return;
        var client = new ZaloClient(zalo.AccessToken);
        client.createArticle(new Article
        {
            Title = post.Title,
            Status = ArticleStatus.HIDE,
            Description = post.Description,
            Cover = new CoverPhoto(post.Thumbnail, ArticleStatus.SHOW)
        });
    }
}
