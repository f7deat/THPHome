using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ViewComponents;

public class LogoViewComponent : ViewComponent
{
    private readonly ApplicationDbContext _context;

    public LogoViewComponent(ApplicationDbContext context)
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
        var logo = await _context.Banners.FirstOrDefaultAsync(x => x.Type == BannerType.LOGO && x.Active && x.Language == PageData.Language);
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
