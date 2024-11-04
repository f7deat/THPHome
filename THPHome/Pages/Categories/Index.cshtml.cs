using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using ApplicationCore.Services;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebUI.Foundations;

namespace WebUI.Pages.Categories
{
    public class IndexModel : EntryPageModel
    {
        private readonly ICategoryService _categoryService;
        public IndexModel(IPostService postService, ApplicationDbContext context, ICategoryService categoryService) : base(postService, context)
        {
            _categoryService = categoryService;
        }

        public IReadOnlyList<Category> Categories { get; set; } = new List<Category>();

        public async Task<IActionResult> OnGetAsync()
        {
            Request.Cookies.TryGetValue("locale", out string locale);
            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }
            Categories = await _categoryService.ListAllAsync(lang);
            return Page();
        }
    }
}
