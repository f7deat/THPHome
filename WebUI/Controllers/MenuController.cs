using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Payload;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Extensions;
using WebUI.Foundations;

namespace WebUI.Controllers
{
    public class MenuController : BaseController
    {
        private readonly IMenuService _menuService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MenuController(IMenuService menuService, UserManager<ApplicationUser> userManager, ApplicationDbContext context) : base(context)
        {
            _menuService = menuService;
            _userManager = userManager;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetListAsync([FromQuery] ListMenuPayload payload)
        {
            return Ok(await _menuService.GetListAsync(payload));
        }

        [HttpGet("options")]
        public async Task<IActionResult> OptionsAsync([FromQuery] Language language)
        {
            return Ok(await _context.Menus.Where(x => x.Language == language).OrderBy(x => x.Name).Select(x => new
            {
                label = x.Name,
                value = x.Id
            }).ToListAsync());
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] Menu menu)
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            menu.CreatedBy = user.Id;
            menu.ModifiedBy = user.Id;
            menu.CreatedDate = DateTime.Now;
            menu.ModifiedDate = DateTime.Now;
            menu.Language = GetLanguage();
            return Ok(await _menuService.AddAsync(menu));
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Menu menu)
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            var data = await _context.Menus.FindAsync(menu.Id);
            if (data is null) return BadRequest("Data not found!");
            data.ModifiedBy = user.Id;
            data.CreatedDate = DateTime.Now;
            data.Name = menu.Name;
            data.Description = menu.Description;
            data.Icon = menu.Icon;
            data.ParrentId = menu.ParrentId;
            data.Index = menu.Index;
            data.Url = menu.Url;
            data.Type = menu.Type;
            data.Mode = menu.Mode;
            return Ok(await _menuService.UpdateAsync(data));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _menuService.DeleteAsyn(id));

        [Route("parrent-list")]
        public async Task<IActionResult> ListParrentAsync(MenuType? type) => Ok(await _menuService.GetListParrentAsync(type));
    }
}
