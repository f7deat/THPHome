using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Extensions;

namespace WebUI.Api;

public class BannerController : BaseController
{
    private readonly IBannerService _bannerService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IWebHostEnvironment _webHostEnvironment;
    public BannerController(IBannerService bannerService, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment, ApplicationDbContext context) : base(context)
    {
        _bannerService = bannerService;
        _userManager = userManager;
        _webHostEnvironment = webHostEnvironment;
    }

    [Route("get-list")]
    public async Task<IActionResult> GetListAsync(BannerType? type) => Ok(await _bannerService.GetListAsync(type));

    [Route("add"), HttpPost]
    public async Task<IActionResult> AddAsync([FromBody]Banner banner)
    {
        banner.CreatedBy = _userManager.GetUserId(User);
        banner.ModifiedBy = _userManager.GetUserId(User);
        await _bannerService.AddAsync(banner);
        return CreatedAtAction(nameof(AddAsync), new { succeeded = true });
    }

    [Route("update"), HttpPost]
    public async Task<IActionResult> UpdateAsync([FromBody]Banner banner)
    {
        var data = await _context.Banners.FindAsync(banner.Id);
        if (data is null) return BadRequest("Banner not found!");
        data.Image = banner.Image;
        data.Url = banner.Url;
        data.Name = banner.Name;
        data.ModifiedBy = User.GetId();
        data.ModifiedDate = DateTime.Now;
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
}
