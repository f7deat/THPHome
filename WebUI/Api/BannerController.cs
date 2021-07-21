using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    [Route("api/[controller]")]
    public class BannerController : Controller
    {
        private readonly IBannerService _bannerService;
        private UserManager<IdentityUser> _userManager;
        public BannerController(IBannerService bannerService, UserManager<IdentityUser> userManager)
        {
            _bannerService = bannerService;
            _userManager = userManager;
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
    }
}
