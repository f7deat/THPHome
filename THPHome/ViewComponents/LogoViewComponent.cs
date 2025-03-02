using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;

namespace THPHome.ViewComponents;

public class LogoViewComponent(ApplicationDbContext _context) : ViewComponent
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
        var logo = await _context.Banners.FirstOrDefaultAsync(x => x.Type == BannerType.LOGO && x.Active && x.Locale == PageData.Locale);
        if (logo is null)
        {
            return View(new Banner
            {
                Image = "/img/logo.png"
            });
        }
        return View(logo);
    }
}
