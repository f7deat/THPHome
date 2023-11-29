using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
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
        private readonly IMenuService _menuService;
        private readonly IPartnerService _partnerService;
        private readonly ICategoryService _categoryService;
        private readonly IVideoService _videoService;
        public HomeController(IPostService postService, IBannerService bannerService, IMenuService menuService, IPartnerService partnerService, ICategoryService categoryService, IVideoService videoService)
        {
            _postService = postService;
            _bannerService = bannerService;
            _menuService = menuService;
            _partnerService = partnerService;
            _categoryService = categoryService;
            _videoService = videoService;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.Slides = await _bannerService.GetListAsync(BannerType.SLIDE);
            // Thông báo
            ViewBag.ListNotification = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 6);
            // Tin tức nổi bật
            ViewBag.ListNews = await _postService.GetListByTypeAsync(PostType.NEWS, 1, 8);

            ViewBag.BoxMenu = await _menuService.GetListAsync(MenuType.BOX);
            ViewBag.Partner = await _partnerService.GetListAsync(1);
            ViewBag.Videos = await _videoService.GetListAsync(5);
            ViewBag.Albums = await _bannerService.GetListAsync(BannerType.PHOTO, 4);
            return View(await _categoryService.GetGroupCategories());
        }

        public IActionResult Privacy() => View();
        public IActionResult Feedback() => View();

        public IActionResult SiteMap() => View();

        [Route("not-found.html")]
        public IActionResult PageNotFound() => View();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() => View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
