using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using WebUI.Interfaces.IService;
using WebUI.Models.Layouts;

namespace WebUI.ViewComponents;

public class BreadcrumbViewComponent : ViewComponent
{
    private readonly ApplicationDbContext _context;
    private readonly ILocalizeService _localizeService;
    public BreadcrumbViewComponent(ApplicationDbContext context, ILocalizeService localizeService)
    {
        _context = context;
        _localizeService = localizeService;
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
        var result = new List<Breadcrumb>
        {
            new() {
                Id = 1,
                Name = await _localizeService.GetAsync("home"),
                Url = "/"
            },
            new()
            {
                Id = 2,
                Name = PageData.Title ?? string.Empty,
                Url = $"/post/{PageData.Url}-{PageData.Id}.html"
            }
        };
        return View(result);
    }
}
