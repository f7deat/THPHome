using ApplicationCore.Constants;
using ApplicationCore.Helpers;
using ApplicationCore.Models.Posts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Enums;
using THPHome.Interfaces.IService;

namespace THPHome.Pages.Categories;

public class DetailsModel(IPostService postService, ApplicationDbContext context, ICategoryService categoryService) : PageModel
{
    protected readonly IPostService _postService = postService;
    protected readonly ApplicationDbContext _context = context;
    private readonly ICategoryService _categoryService = categoryService;

    public Post PageData { private set; get; } = new Post();
    public IEnumerable<PostView> ListNotification = [];

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        var page = context.RouteData.Values["page"]?.ToString();
        if (string.IsNullOrEmpty(page))
        {
            return;
        }
        Request.Cookies.TryGetValue("locale", out string? locale);
        var catalog = new Post
        {
            Locale = locale,
        };
        PageData = catalog;
        RouteData.Values.TryAdd(nameof(Post), catalog);
    }

    public Category ParentCategory { get; set; } = new Category();
    public Category Category { get; set; } = new Category();
    [BindProperty(SupportsGet = true)]
    public string SearchTerm { get; set; } = string.Empty;
    [BindProperty(SupportsGet = true)]
    public int Current { get; set; } = 1;
    public PaginatedList<PostView>? Posts;
    public IEnumerable<Category> Categories { get; set; } = [];

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Category = await _categoryService.GetCategory(id) ?? new Category();
        if (Category is null)
        {
            return Redirect(SpecialPages.NotFound);
        }
        if (Category.ParentId != null)
        {
            ParentCategory = await _categoryService.GetParentAsync(Category.ParentId ?? 0) ?? new Category();
        }
        ViewData["Title"] = Category.Name;
        if (!string.IsNullOrEmpty(SearchTerm))
        {
            ViewData["Title"] = $"[{Category.Name}] {SearchTerm}";
        }
        ViewData["Description"] = Category.Description;
        Posts = await _postService.GetListInCategoryAsync(Category.Id, SearchTerm, Current);
        Categories = await _categoryService.GetChildCategoriesAsync(Category.Id);
        ListNotification = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 6, PageData.Locale ?? "vi-VN");
        return Page();
    }
}
