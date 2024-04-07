using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Payload;
using ApplicationCore.Models.Posts;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebUI.Entities;
using WebUI.Foundations;

namespace WebUI.Pages;

public class IndexModel : EntryPageModel
{
    private readonly IBannerService _bannerService;
    private readonly IMenuService _menuService;
    private readonly IPartnerService _partnerService;
    private readonly IVideoService _videoService;
    private readonly ICategoryService _categoryService;

    public List<ApplicationCore.Models.Categories.GroupCategory> GroupCategories;
    public IEnumerable<Menu> BoxMenu;
    public IEnumerable<Photo> Albums;
    public IEnumerable<Video> Videos;
    public IEnumerable<Partner> Partners;
    public IEnumerable<PostView> ListNews;
    public IEnumerable<PostView> ListNotification;
    public List<Banner> Slides = [];

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
        var banners = from slide in _context.Banners
                      join post in _context.Posts on slide.PostId equals post.Id
                      into slidePost
                      from post in slidePost.DefaultIfEmpty()
                      where slide.Type == BannerType.SLIDE
                      select new Banner
                      {
                          Name = post.Title ?? slide.Name,
                          Description = post.Description ?? slide.Description,
                          Id = slide.Id,
                          Image = slide.Image,
                          Url = !string.IsNullOrEmpty(post.Url) ? $"/post/{post.Url}-{post.Id}.html" : slide.Url,
                      };
        Slides = await banners.Take(8).ToListAsync();

        // Thông báo
        ListNotification = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 6, PageData.Language);
        // Tin tức nổi bật
        ListNews = await _postService.GetListByTypeAsync(PostType.NEWS, 1, 8, PageData.Language);

        BoxMenu = await _menuService.GetListAsync(new ListMenuPayload
        {
            Language = PageData.Language,
            Type = MenuType.BOX
        });
        //Partners = await _context.Partners.Where(x => x.Status == ParnerStatus.Active).ToListAsync();
        Videos = await _videoService.GetListAsync(5);
        Albums = await _context.Photos.OrderByDescending(x => x.CreatedDate).ToListAsync();
        GroupCategories = await _categoryService.GetGroupCategories(PageData.Language);
        if (!string.IsNullOrWhiteSpace(lang))
        {
            Response.Cookies.Append("locale", lang);
            return Redirect("/");
        }
        return Page();
    }
}
