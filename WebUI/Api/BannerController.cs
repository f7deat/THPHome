using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
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

namespace WebUI.Api
{
    [Route("api/[controller]")]
    public class BannerController : Controller
    {
        private readonly IBannerService _bannerService;
        private UserManager<IdentityUser> _userManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BannerController(IBannerService bannerService, UserManager<IdentityUser> userManager, IWebHostEnvironment webHostEnvironment)
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
            banner.ModifiedBy = _userManager.GetUserId(User);
            return Ok(new {succeeded = await _bannerService.UpdateAsync(banner)});
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
}
