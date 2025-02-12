using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPHome.Models.Categories;
using THPHome.Models.Payload;
using WebUI.Models.Posts;

namespace THPHome.Pages;

public class IndexModel : EntryPageModel
{
    private readonly IMenuService _menuService;
    private readonly IVideoService _videoService;
    private readonly ICategoryService _categoryService;

    public List<GroupCategory> GroupCategories = [];
    public IEnumerable<Menu> BoxMenu = [];
    public IEnumerable<Photo> Albums = [];
    public IEnumerable<Video> Videos = [];
    public IEnumerable<Partner> Partners = [];
    public IEnumerable<PostView> ListNews = [];
    public IEnumerable<PostView> ListNotification = [];
    public List<Banner> Slides = [];
    public List<BlockList> Blocks = [];
    public IEnumerable<PostView> PressTalks = [];

    public IndexModel(IPostService postService, IMenuService menuService, IVideoService videoService, ICategoryService categoryService, ApplicationDbContext context) : base(postService, context)
    {
        _menuService = menuService;
        _videoService = videoService;
        _categoryService = categoryService;
    }

    public async Task<IActionResult> OnGetAsync(string locale)
    {
        if (!string.IsNullOrWhiteSpace(locale))
        {
            Response.Cookies.Append("locale", locale);
            return Redirect("/");
        }
        var banners = from slide in _context.Banners
                      join post in _context.Posts on slide.PostId equals post.Id
                      into slidePost
                      from post in slidePost.DefaultIfEmpty()
                      where slide.Type == BannerType.SLIDE && slide.Language == PageData.Language && slide.Active
                      select new Banner
                      {
                          Name = post.Title ?? slide.Name,
                          Description = post.Description ?? slide.Description,
                          Id = slide.Id,
                          Image = slide.Image,
                          Url = !string.IsNullOrEmpty(post.Url) ? $"/post/{post.Url}-{post.Id}.html" : slide.Url,
                      };
        Slides = await banners.ToListAsync();

        // Thông báo
        ListNotification = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 6, PageData.Language);
        // Tin tức nổi bật
        ListNews = await _postService.GetListByTypeAsync(PostType.NEWS, 1, 8, PageData.Language);

        BoxMenu = await _menuService.GetListAsync(new ListMenuPayload
        {
            Language = PageData.Language,
            Type = MenuType.BOX
        });
        Videos = await _videoService.GetListAsync(5);
        Albums = await _context.Photos.OrderByDescending(x => x.CreatedDate).Take(8).ToListAsync();
        GroupCategories = await _categoryService.GetGroupCategories(PageData.Language);
        Blocks = await (from a in _context.PostBlocks.Where(x => x.PostId == PageData.Id)
                        join b in _context.Blocks on a.BlockId equals b.Id
                        where a.Active
                        orderby a.SortOrder ascending
                        select new BlockList
                        {
                            Id = a.Id,
                            ViewComponent = b.NormalizedName
                        }).ToListAsync();

        var pressTalks = from a in _context.Posts
                         join b in _context.PostCategories on a.Id equals b.PostId
                         where b.CategoryId == 551
                         orderby a.CreatedDate descending
                         select new PostView
                         {
                             Id = a.Id,
                             Description = a.Description,
                             Thumbnail = a.Thumbnail,
                             Title = a.Title,
                             Url = a.Url,
                             View = a.View,
                             IssuedDate = a.IssuedDate
                         };

        PressTalks = await pressTalks.Take(3).ToListAsync();

        return Page();
    }
}
