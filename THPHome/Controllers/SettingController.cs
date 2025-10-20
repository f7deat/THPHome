﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using THPCore.Helpers;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Models.Settings;
using WebUI.Interfaces.IService;

namespace THPHome.Controllers;

public class SettingController(ApplicationDbContext context, ISettingService _settingService, IHCAService _hcaService) : BaseController(context)
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

    [HttpPost("logo")]
    public async Task<IActionResult> SetLogoAsync([FromBody] Banner args, [FromQuery] string locale)
    {
        if (!LocaleHelper.IsAvailable(locale)) return BadRequest("Locale not available!");
        var data = await _context.Banners.FirstOrDefaultAsync(x => x.Type == BannerType.LOGO && x.Locale == locale);
        if (data is null)
        {
            data = new Banner
            {
                Locale = locale,
                Active = true,
                Image = args.Image,
                CreatedBy = _hcaService.GetUserId(),
                CreatedDate = DateTime.Now,
                Status = BannerStatus.ACTIVE,
                Url = "/",
                Type = BannerType.LOGO
            };
            await _context.Banners.AddAsync(data);
            await _context.SaveChangesAsync();
            return Ok();
        }
        data.Image = args.Image;
        data.ModifiedBy = _hcaService.GetUserId();
        data.ModifiedDate = DateTime.Now;
        _context.Banners.Update(data);
        await _context.SaveChangesAsync();
        return Ok();
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
