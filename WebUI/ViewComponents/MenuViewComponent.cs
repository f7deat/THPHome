using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.ViewComponents
{
    public class MenuViewComponent : ViewComponent
    {
        private readonly IMenuService _menuService;

        public MenuViewComponent(IMenuService menuService)
        {
            _menuService = menuService;
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
                    view = "Main";
                    break;
                default:
                    break;
            }
            return View(view, await _menuService.GetListAsync(type));
        }
    }
}
