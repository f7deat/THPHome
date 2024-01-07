using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using ApplicationCore.Services;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebUI.Foundations;

namespace WebUI.Pages
{
    public class IndexModel : EntryPageModel
    {
        private readonly IBannerService _bannerService;
        private readonly IMenuService _menuService;
        private readonly IPartnerService _partnerService;
        private readonly IVideoService _videoService;
        private readonly ICategoryService _categoryService;

        public List<ApplicationCore.Models.Categories.GroupCategory> GroupCategories;
        public IEnumerable<Menu> BoxMenu;
        public IEnumerable<Banner> Albums;
        public IEnumerable<Video> Videos;
        public IEnumerable<Partner> Partners;
        public IEnumerable<PostView> ListNews;
        public IEnumerable<PostView> ListNotification;
        public IEnumerable<Banner> Slides;

        public IndexModel(IPostService postService, IBannerService bannerService, IMenuService menuService, IPartnerService partnerService, IVideoService videoService, ICategoryService categoryService, ApplicationDbContext context) : base(postService, context)
        {
            _bannerService = bannerService;
            _menuService = menuService;
            _partnerService = partnerService;
            _videoService = videoService;
            _categoryService = categoryService;
        }

        public async Task<IActionResult> OnGetAsync(string lang)
        {
            Slides = await _bannerService.GetListAsync(BannerType.SLIDE);
            // Thông báo
            ListNotification = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 6, PageData.Language);
            // Tin tức nổi bật
            ListNews = await _postService.GetListByTypeAsync(PostType.NEWS, 1, 8, PageData.Language);

            BoxMenu = await _menuService.GetListAsync(PageData.Language, MenuType.BOX);
            Partners = await _partnerService.GetListAsync(1);
            Videos = await _videoService.GetListAsync(5);
            Albums = await _bannerService.GetListAsync(BannerType.PHOTO, 4);
            GroupCategories = await _categoryService.GetGroupCategories(PageData.Language);
            if (!string.IsNullOrWhiteSpace(lang))
            {
                Response.Cookies.Append("locale", lang);
                return Redirect("/");
            }
            return Page();
        }
    }
}
