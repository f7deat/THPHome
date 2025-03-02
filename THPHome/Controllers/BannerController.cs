using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Helpers;
using THPIdentity.Entities;
using WebUI.Foundations;
using WebUI.Models.Filters.Settings;

namespace THPHome.Controllers;

public class BannerController(IBannerService _bannerService, UserManager<ApplicationUser> _userManager, IWebHostEnvironment _webHostEnvironment, ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> GetListAsync(BannerFilterOptions filterOptions) => Ok(await _bannerService.GetListAsync(filterOptions));

    [Route("add"), HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] Banner banner)
    {
        banner.CreatedBy = _userManager.GetUserId(User);
        banner.CreatedDate = DateTime.Now;
        banner.Active = true;
        await _bannerService.AddAsync(banner);
        return CreatedAtAction(nameof(AddAsync), new { succeeded = true });
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Banner banner)
    {
        var data = await _context.Banners.FindAsync(banner.Id);
        if (data is null) return BadRequest("Banner not found!");
        data.Image = banner.Image;
        data.Url = banner.Url;
        data.Name = banner.Name;
        data.ModifiedBy = User.GetId();
        data.ModifiedDate = DateTime.Now;
        data.PostId = banner.PostId;
        data.Description = banner.Description;
        _context.Banners.Update(data);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [Route("delete/{id}"), HttpPost]
    public async Task<IActionResult> DeleteAsync(int id) => Ok(await _bannerService.DeleteAsync(id));


    [HttpPost("upload")]
    public async Task<IActionResult> UploadAsync([FromForm] IFormFile file)
    {
        if (file?.Length > 0)
        {
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "files");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { succeeded = true, fileUrl = $"/files/{fileName}" });
        }
        return Ok(new { succeeded = false, fileUrl = "" });
    }

    [HttpPost("active/{id}")]
    public async Task<IActionResult> ActiveAsync([FromRoute] int id)
    {
        var banner = await _context.Banners.FindAsync(id);
        if (banner == null) return BadRequest("Data not found!");
        banner.Active = !banner.Active;
        banner.ModifiedDate = DateTime.Now;
        banner.ModifiedBy = User.GetId();
        _context.Banners.Update(banner);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("logo")]
    public async Task<IActionResult> GetLogoAsync([FromQuery] string locale)
    {
        var language = LanguageHelper.GetLanguage(locale);
        var logo = await _context.Banners.FirstOrDefaultAsync(x => x.Active && x.Locale == locale && x.Type == BannerType.LOGO);
        if (logo is null)
        {
            logo = new Banner
            {
                Image = "https://dhhp.edu.vn/img/logo.png",
                Locale = locale,
                Active = true,
                Type = BannerType.LOGO
            };
            await _context.Banners.AddAsync(logo);
            await _context.SaveChangesAsync();
        }
        return Ok(logo);
    }
}
