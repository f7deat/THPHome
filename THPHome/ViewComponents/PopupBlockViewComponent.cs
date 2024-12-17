using ApplicationCore.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;

namespace WebUI.ViewComponents;

public class PopupBlockViewComponent : ViewComponent
{
    private readonly ApplicationDbContext _context;
    public PopupBlockViewComponent(ApplicationDbContext context)
    {
        _context = context;
    }

    protected Post PageData
    {
        get
        {
            RouteData.Values.TryGetValue(nameof(Post), out var values);
            return values as Post ?? new Post();
        }
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var popup = await _context.Banners.FirstOrDefaultAsync(x => x.Type == BannerType.LOGO && x.Active && x.Language == PageData.Language);
        if (popup is null)
        {
            return View();
        }
        return View(popup);
    }
}
