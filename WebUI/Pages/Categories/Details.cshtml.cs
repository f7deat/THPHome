using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using ApplicationCore.Models.Posts;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebUI.Pages.Categories
{
    public class DetailsModel(IPostService postService, ApplicationDbContext context, ICategoryService categoryService) : PageModel
    {
        protected readonly IPostService _postService = postService;
        protected readonly ApplicationDbContext _context = context;
        private readonly ICategoryService _categoryService = categoryService;

        public Post PageData { private set; get; } = new Post();

        public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
        {
            var page = context.RouteData.Values["page"]?.ToString();
            if (string.IsNullOrEmpty(page))
            {
                return;
            }
            Request.Cookies.TryGetValue("locale", out string locale);
            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }
            var catalog = new Post();
            catalog.Language = lang;
            PageData = catalog;
            RouteData.Values.TryAdd(nameof(Post), catalog);
        }

        public Category ParentCategory { get; set; } = new Category();
        public Category Category { get; set; } = new Category();
        [BindProperty(SupportsGet = true)]
        public string SearchTerm { get; set; } = string.Empty;
        [BindProperty(SupportsGet = true)]
        public int PageIndex { get; set; } = 1;
        public PaginatedList<PostView> Posts;
        public IEnumerable<Category> Categories { get; set; }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            Category = await _categoryService.GetCategory(id);
            if (Category is null)
            {
                return Redirect(SpecialPages.NotFound);
            }
            if (Category.ParrentId != null)
            {
                ParentCategory = await _categoryService.GetParrentAsync(Category.ParrentId ?? 0);
            }
            ViewData["Title"] = Category.Name;
            if (!string.IsNullOrEmpty(SearchTerm))
            {
                ViewData["Title"] = $"[{Category.Name}] {SearchTerm}";
            }
            ViewData["Description"] = Category.Description;
            Posts = await _postService.GetListInCategoryAsync(Category.Id, SearchTerm, PageIndex);
            Categories = await _categoryService.GetChildCategoriesAsync(Category.Id);
            return Page();
        }
    }
}
