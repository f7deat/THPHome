using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Payload;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Foundations;

namespace WebUI.ViewComponents
{
    public class MenuViewComponent : ViewComponent
    {
        private readonly IMenuService _menuService;
        private readonly ApplicationDbContext _context;

        public MenuViewComponent(IMenuService menuService, ApplicationDbContext context)
        {
            _menuService = menuService;
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
                        Language = PageData.Language,
                        Type = type
                    }));
                default:
                    break;
            }
            return View(view, await _menuService.GetListAsync(new ListMenuPayload
            {
                Language = PageData.Language,
                Type = type
            }));
        }
    }
}
