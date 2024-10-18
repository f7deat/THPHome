using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using WebUI.Foundations;
using WebUI.Helpers;

namespace WebUI.Pages.Search;

public class IndexModel : EntryPageModel
{

    public IEnumerable<PostView> RandomPosts = [];
    private readonly ICategoryService _categoryService;
    public PaginatedList<PostView>? Posts;

    public IndexModel(IPostService postService, ApplicationDbContext context, ICategoryService categoryService) : base(postService, context)
    {
        _categoryService = categoryService;
    }

    [BindProperty(SupportsGet = true)]
    public string SearchTerm { get; set; } = string.Empty;
    public int Current { get; set; } = 1;
    public int? CategoryId { get; set; }

    public async Task<IActionResult> OnGetAsync()
    {
        RandomPosts = await _postService.GetRandomPostsAsync();

        Request.Cookies.TryGetValue("locale", out string? locale);
        var lang = LanguageHelper.GetLanguage(locale);

        if (string.IsNullOrEmpty(SearchTerm))
        {
            return Page();
        }
        Posts = await _postService.SearchAsync(SearchTerm.ToLower(), CategoryId, Current, 10);
        return Page();
    }
}
