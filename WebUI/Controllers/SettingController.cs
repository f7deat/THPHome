using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebUI.Foundations;
using WebUI.Interfaces.IService;
using WebUI.Models.Settings;

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
}
