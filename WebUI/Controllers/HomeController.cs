using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using ApplicationCore.Entities;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using ExternalAPI.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebUI.Models;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPostService _postService;
        private readonly IBannerService _bannerService;
        private readonly ITelegramService _telegramService;
        public HomeController(IPostService postService, IBannerService bannerService, ITelegramService telegramService)
        {
            _postService = postService;
            _bannerService = bannerService;
            _telegramService = telegramService;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _postService.GetListByAllCategoryAsync());
        }

        public IActionResult Privacy() => View();
        public IActionResult Feedback() => View();
        [HttpPost]
        public async Task<JsonResult> Feedback(Feedback feedback)
        {
            if (feedback.Name == null || feedback.Message == null)
            {
                return Json(false);
            }
            var message = await JsonHelper.SerializeAsync(feedback);
            return Json(await _telegramService.SendMessageAsync(message));
        }

        public IActionResult SiteMap() => View();

        [Route("not-found.html")]
        public IActionResult PageNotFound() => View();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() => View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
