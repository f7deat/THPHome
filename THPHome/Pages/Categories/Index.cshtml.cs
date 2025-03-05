using ApplicationCore.Enums;
using ApplicationCore.Models;
using ApplicationCore.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;

namespace THPHome.Pages.Categories;

public class IndexModel(IPostService postService, ApplicationDbContext context, ICategoryService _categoryService) : EntryPageModel(postService, context)
{
    public IReadOnlyList<Category> Categories { get; set; } = [];

    public async Task<IActionResult> OnGetAsync()
    {
        Request.Cookies.TryGetValue("locale", out string? locale);
        Categories = await _categoryService.ListAllAsync(locale);
        return Page();
    }
}
