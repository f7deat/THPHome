using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                    var model = new MainMenu
                    {
                        Menus = await _menuService.GetListAsync(type),
                        Faculties = await _context.Departments.Where(x => x.Type == DepartmentType.Faculty).ToListAsync()
                    };
                    return View("Main", model);
                default:
                    break;
            }
            return View(view, await _menuService.GetListAsync(type));
        }
    }

    public class MainMenu
    {
        public IReadOnlyList<Menu> Menus { get; set; }
        public IEnumerable<Department> Faculties { get; set; }
    }
}
