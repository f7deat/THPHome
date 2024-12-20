using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using THPHome.Data;
using THPHome.Entities;

namespace WebUI.Foundations;

public abstract class DynamicPageModel : PageModel
{
    protected readonly ApplicationDbContext _context;
    public DynamicPageModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public Post PageData { protected set; get; } = new Post();

    public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
    {
        context.RouteData.Values.TryGetValue("postId", out var postId);
        if (postId is null)
        {
            context.HttpContext.Response.StatusCode = 404;
            context.HttpContext.Response.Redirect("/exception/notfound");
            return;
        }
        _ = long.TryParse(postId.ToString(), out long id);
        var catalog = await _context.Posts.FindAsync(id);
        if (catalog is null)
        {
            context.HttpContext.Response.StatusCode = 404;
            context.HttpContext.Response.Redirect("/exception/notfound");
            return;
        }

        catalog.View++;
        _context.Update(catalog);
        await _context.SaveChangesAsync();

        PageData = catalog;
        ViewData["Title"] = catalog.Title;
        ViewData["Description"] = catalog.Description;
        ViewData["Image"] = catalog.Thumbnail;
        RouteData.Values.TryAdd(nameof(Post), PageData);
    }
}
