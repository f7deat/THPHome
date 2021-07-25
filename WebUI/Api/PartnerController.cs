using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    [Route("/api/[controller]")]
    public class PartnerController : Controller
    {
        private readonly IPartnerService _partnerService;
        private readonly UserManager<IdentityUser> _userManager;
        public PartnerController(IPartnerService partnerService, UserManager<IdentityUser> userManager)
        {
            _partnerService = partnerService;
            _userManager = userManager;
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _partnerService.GetListAsync());

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] Partner partner)
        {
            var user = await _userManager.GetUserAsync(User);
            partner.ModifiedBy = user.Id;
            partner.CreatedBy = user.Id;
            return Ok(await _partnerService.AddAsync(partner));
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Partner partner)
        {
            var user = await _userManager.GetUserAsync(User);
            partner.ModifiedBy = user.Id;
            return Ok(await _partnerService.UpdateAsync(partner));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _partnerService.DeleteAsync(id));
    }
}
