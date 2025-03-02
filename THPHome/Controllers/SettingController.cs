using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using THPHome.Data;
using THPHome.Entities;
using WebUI.Foundations;
using WebUI.Interfaces.IService;
using WebUI.Models.Settings;
using WebUI.Models.ViewModel;

namespace THPHome.Controllers;

public class SettingController(ApplicationDbContext context, ISettingService _settingService) : BaseController(context)
{
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
                    where a.Type == BannerType.LOGO && a.Active && a.Locale == locale
                    select a;
        var data = await query.FirstOrDefaultAsync();
        return Ok(new { data = data?.Image });
    }

    [HttpGet("slides")]
    public async Task<IActionResult> GetSlideAsync([FromQuery] string locale)
    {
        var query = from a in _context.Banners
                    where a.Type == BannerType.SLIDE && a.Active && a.Locale == locale
                    select new
                    {
                        a.Id,
                        a.Name,
                        a.Url,
                        a.Image,
                        a.Description
                    };
        var data = await query.AsNoTracking().ToListAsync();
        return Ok(new { data });
    }
}
