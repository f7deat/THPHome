using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    [Route("api/[controller]")]
    public class MenuController : Controller
    {
        private readonly IMenuService _menuService;
        private readonly UserManager<IdentityUser> _userManager;
        public MenuController(IMenuService menuService, UserManager<IdentityUser> userManager)
        {
            _menuService = menuService;
            _userManager = userManager;
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _menuService.GetListAsync());

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] Menu menu)
        {
            var user = await _userManager.GetUserAsync(User);
            menu.CreatedBy = user.Id;
            menu.ModifiedBy = user.Id;
            menu.CreatedDate = DateTime.Now;
            menu.ModifiedDate = DateTime.Now;
            return Ok(await _menuService.AddAsync(menu));
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Menu menu)
        {
            var user = await _userManager.GetUserAsync(User);
            menu.ModifiedBy = user.Id;
            menu.ModifiedDate = DateTime.Now;
            return Ok(await _menuService.UpdateAsync(menu));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _menuService.DeleteAsyn(id));
    }
}
