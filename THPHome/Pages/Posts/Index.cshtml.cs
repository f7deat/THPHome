using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPIdentity.Entities;
using WebUI.Foundations;
using WebUI.Models.Posts;

namespace THPHome.Pages.Posts;

public class IndexModel(ApplicationDbContext context, ICategoryService categoryService, IPostService postService, IAttachmentService attachmentService, UserManager<ApplicationUser> userManager) : DynamicPageModel(context)
{
    private readonly ICategoryService _categoryService = categoryService;
    private readonly IPostService _postService = postService;
    private readonly IAttachmentService _attachmentService = attachmentService;
    public IEnumerable<PostView> RandomPosts = new List<PostView>();
    public IEnumerable<Post> RelatedPosts = new List<Post>();
    public List<Category> Categories = [];
    public List<Attachment> Attachments = [];
    public List<BlockList> Blocks = new List<BlockList>();
    public ApplicationUser? Author;
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    public async Task<IActionResult> OnGetAsync()
    {
        Categories = await _categoryService.GetListInPostAsync(PageData.Id);
        RandomPosts = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 5, Language.VI);
        if (Categories.Count > 0)
        {
            var categoryId = Categories.Select(c => c.Id).First();
            var relateds = from c in _context.PostCategories
                           join p in _context.Posts on c.PostId equals p.Id
                           where c.CategoryId == categoryId && p.Status == PostStatus.PUBLISH && p.Id != PageData.Id
                           orderby p.IssuedDate descending
                           select new Post
                           {
                               Id = p.Id,
                               Title = p.Title,
                               IssuedDate = p.IssuedDate,
                               View = p.View,
                               Url = p.Url + "-" + p.Id + ".html"
                           };
            RelatedPosts = await relateds.Take(10).ToListAsync();
        }

        Attachments = await _attachmentService.GetListInPostAsync(PageData.Id);

        if (PageData.Type == PostType.PAGE)
        {
            Blocks = await (from a in _context.PostBlocks.Where(x => x.PostId == PageData.Id)
                            join b in _context.Blocks on a.BlockId equals b.Id
                            where a.Active
                            orderby a.SortOrder ascending
                            select new BlockList
                            {
                                Id = a.Id,
                                ViewComponent = b.NormalizedName
                            }).ToListAsync();
        }

        if (!string.IsNullOrEmpty(PageData.CreatedBy))
        {
            Author = await _userManager.FindByIdAsync(PageData.CreatedBy);
        }

        return Page();
    }
}
