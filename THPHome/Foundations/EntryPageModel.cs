using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using THPHome.Entities;
using THPHome.Enums;
using THPHome.Interfaces.IService;

namespace THPHome.Foundations;

public class EntryPageModel(IPostService postService) : PageModel
{
    protected readonly IPostService _postService = postService;

    public Post PageData { private set; get; } = new Post();

    public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
    {
        var page = context.RouteData.Values["page"]?.ToString();
        if (string.IsNullOrEmpty(page)) return;

        Request.Cookies.TryGetValue("locale", out string? locale);
        var catalog = await _postService.EnsureDataAsync(page.ToLower(), PostType.Entry, locale ?? "vi-VN");
        PageData = catalog;
        ViewData["Title"] = catalog.Title;
        ViewData["Description"] = catalog.Description;
        ViewData["Image"] = catalog.Thumbnail;
        RouteData.Values.TryAdd(nameof(Post), catalog);
    }
}
