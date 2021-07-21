using ApplicationCore.Constants;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly IPostService _postService;
        public DashboardController(IPostService postService)
        {
            _postService = postService;
        }
        [Route("get")]
        public IActionResult Index()
        {
            return Ok(true);
        }
        [Route("get-total-post")]
        public async Task<IActionResult> GetTotalPostAsync() => Ok(await _postService.GetTotalAsync());
    }
}
