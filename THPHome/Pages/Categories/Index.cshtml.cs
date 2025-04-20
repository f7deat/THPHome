using Microsoft.AspNetCore.Mvc;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;

namespace THPHome.Pages.Categories;

public class IndexModel(IPostService postService, ICategoryService _categoryService) : EntryPageModel(postService)
{
    public IReadOnlyList<Category> Categories { get; set; } = [];

    public async Task<IActionResult> OnGetAsync()
    {
        Request.Cookies.TryGetValue("locale", out string? locale);
        Categories = await _categoryService.ListAllAsync(locale ?? "vi-VN");
        return Page();
    }
}
