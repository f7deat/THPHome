using ApplicationCore.Entities;
using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using THPHome.Data;
using WebUI.Foundations;
using WebUI.Interfaces.IService;
using WebUI.Models.Settings;
using WebUI.Models.ViewModel;

namespace WebUI.Controllers;

public class SettingController : BaseController
{
    private readonly ISettingService _settingService;
    public SettingController(ApplicationDbContext context, ISettingService settingService) : base(context)
    {
        _settingService = settingService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync() => Ok(await _settingService.ListAsync());

    [HttpPost("zalo")]
    public async Task<IActionResult> ZaloSaveAsync([FromBody] ZaloSetting args)
    {
        try
        {
            var zalo = await _context.ApplicationSettings.FirstOrDefaultAsync(x => x.Key == "ZALO");
            if (zalo is null) return BadRequest("Zalo setting not found!");
            // https://developers.zalo.me/docs/official-account/bat-dau/xac-thuc-va-uy-quyen-cho-ung-dung-new
            args.ExpiredDate = DateTime.Now.AddMonths(3);
            zalo.Value = JsonConvert.SerializeObject(args);
            _context.ApplicationSettings.Update(zalo);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("zalo")]
    public async Task<IActionResult> GetZaloSettingAsync()
    {
        var zalo = await _context.ApplicationSettings.FirstOrDefaultAsync(x => x.Key == "ZALO");
        if (zalo is null) return BadRequest("Zalo setting not found!");
        return Ok(JsonConvert.DeserializeObject<ZaloSetting>(zalo.Value));
    }

    [HttpGet("zalo/articles")]
    public async Task<IActionResult> GetZaloArticleAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _context.Posts
                    join b in _context.ZaloArticles on a.Id equals b.PostId
                    orderby b.ModifiedDate descending
                    select new
                    {
                        b.Id,
                        a.Title,
                        a.Url,
                        b.CreatedDate,
                        b.ModifiedDate
                    };
        return Ok(await ListResult<dynamic>.Success(query, filterOptions));
    }

    [HttpGet("logo"), AllowAnonymous]
    public async Task<IActionResult> GetLogoAsync([FromQuery] string? locale)
    {
        var query = from a in _context.Banners
                    where a.Type == BannerType.LOGO && a.Active
                    select a;
        if (locale == "en-US")
        {
            query = query.Where(x => x.Language == ApplicationCore.Enums.Language.EN);
        }
        else
        {
            query = query.Where(x => x.Language == ApplicationCore.Enums.Language.VI);
        }
        var data = await query.FirstOrDefaultAsync();
        return Ok(new { data = data?.Image });
    }
}
