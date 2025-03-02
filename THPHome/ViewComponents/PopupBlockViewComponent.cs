using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;

namespace THPHome.ViewComponents;

public class PopupBlockViewComponent(ApplicationDbContext _context) : ViewComponent
{
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
        var popup = await _context.Banners.FirstOrDefaultAsync(x => x.Type == BannerType.LOGO && x.Active && x.Locale == PageData.Locale);
        if (popup is null)
        {
            return View();
        }
        return View(popup);
    }
}
