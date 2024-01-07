﻿using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using ApplicationCore.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebUI.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IBannerService _bannerService;
        private readonly IPostService _postService;
        private readonly IMenuService _menuService;
        private readonly IPartnerService _partnerService;
        private readonly IVideoService _videoService;
        private readonly ICategoryService _categoryService;

        public IndexModel(IBannerService bannerService, IPostService postService, IMenuService menuService, IPartnerService partnerService, IVideoService videoService, ICategoryService categoryService)
        {
            _bannerService = bannerService;
            _postService = postService;
            _menuService = menuService;
            _partnerService = partnerService;
            _videoService = videoService;
            _categoryService = categoryService;
        }

        public List<ApplicationCore.Models.Categories.GroupCategory> GroupCategories;
        public IEnumerable<Menu> BoxMenu;
        public IEnumerable<Banner> Albums;
        public IEnumerable<Video> Videos;
        public IEnumerable<Partner> Partners;
        public IEnumerable<PostView> ListNews;
        public IEnumerable<PostView> ListNotification;
        public IEnumerable<Banner> Slides;

        public async Task<IActionResult> OnGetAsync(string lang)
        {
            Slides = await _bannerService.GetListAsync(BannerType.SLIDE);
            // Thông báo
            ListNotification = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 6);
            // Tin tức nổi bật
            ListNews = await _postService.GetListByTypeAsync(PostType.NEWS, 1, 8);

            BoxMenu = await _menuService.GetListAsync(MenuType.BOX);
            Partners = await _partnerService.GetListAsync(1);
            Videos = await _videoService.GetListAsync(5);
            Albums = await _bannerService.GetListAsync(BannerType.PHOTO, 4);
            GroupCategories = await _categoryService.GetGroupCategories();
            if (!string.IsNullOrWhiteSpace(lang))
            {
                Response.Cookies.Append("locale", lang);
            }
            return Page();
        }
    }
}
