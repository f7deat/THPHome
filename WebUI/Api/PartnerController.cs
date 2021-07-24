using ApplicationCore.Interfaces.IService;
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
        public PartnerController(IPartnerService partnerService)
        {
            _partnerService = partnerService;
        }
        public async Task<IActionResult> GetListAsync()
        {
            return Ok(await _partnerService.GetListAsync());
        }
    }
}
