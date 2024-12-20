using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using THPHome.Data;
using THPHome.Entities;
using WebUI.Helpers;

namespace WebUI.Foundations;

public class EntryPageModel : PageModel
{
    protected readonly IPostService _postService;
    protected readonly ApplicationDbContext _context;

    public EntryPageModel(IPostService postService, ApplicationDbContext context)
    {
        _postService = postService;
        _context = context;
    }

    public Post PageData { private set; get; } = new Post();

    public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
    {
        var page = context.RouteData.Values["page"]?.ToString();
        if (string.IsNullOrEmpty(page)) return;

        Request.Cookies.TryGetValue("locale", out string? locale);
        var lang = LanguageHelper.GetLanguage(locale);
        var catalog = await _postService.EnsureDataAsync(page.ToLower(), PostType.Entry, lang);
        PageData = catalog;
        ViewData["Title"] = catalog.Title;
        ViewData["Description"] = catalog.Description;
        ViewData["Image"] = catalog.Thumbnail;
        RouteData.Values.TryAdd(nameof(Post), catalog);
    }
}
