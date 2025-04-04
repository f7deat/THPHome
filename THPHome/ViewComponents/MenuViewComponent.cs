using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IService;
using THPHome.Models.Payload;

namespace THPHome.ViewComponents;

public class MenuViewComponent(IMenuService _menuService) : ViewComponent
{
    protected Post PageData
    {
        get
        {
            RouteData.Values.TryGetValue(nameof(Post), out var values);
            return values as Post ?? new Post();
        }
    }

    public async Task<IViewComponentResult> InvokeAsync(MenuType type)
    {
        string view = string.Empty;
        switch (type)
        {
            case MenuType.DEFAULT:
                view = "";
                break;
            case MenuType.TOP:
                view = "Top";
                break;
            case MenuType.MAIN:
                return View("Main", await _menuService.GetListAsync(new ListMenuPayload
                {
                    Type = type,
                    Locale = PageData.Locale
                }));
            default:
                break;
        }
        return View(view, await _menuService.GetListAsync(new ListMenuPayload
        {
            Type = type
        }));
    }
}
