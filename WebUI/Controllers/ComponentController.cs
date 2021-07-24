using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    public class ComponentController : Controller
    {
        private readonly IMenuService _menuService;
        public ComponentController(IMenuService menuService)
        {
            _menuService = menuService;
        }
        public async Task<IActionResult> TopMenu() => View(await _menuService.GetListAsync(MenuType.TOP));
    }
}
