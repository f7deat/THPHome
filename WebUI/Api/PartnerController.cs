using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
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

namespace WebUI.Api
{
    [Route("/api/[controller]")]
    public class PartnerController : Controller
    {
        private readonly IPartnerService _partnerService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public PartnerController(IPartnerService partnerService, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment)
        {
            _partnerService = partnerService;
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _partnerService.GetListAsync());

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] Partner partner)
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            partner.ModifiedBy = user.Id;
            partner.CreatedBy = user.Id;
            return Ok(await _partnerService.AddAsync(partner));
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Partner partner)
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            partner.ModifiedBy = user.Id;
            return Ok(await _partnerService.UpdateAsync(partner));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _partnerService.DeleteAsync(id));

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
