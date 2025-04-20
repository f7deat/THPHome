using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;

namespace THPHome.Controllers;

public class MenuController(IMenuService _menuService, ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> GetListAsync([FromQuery] FilterOptions payload) => Ok(await _menuService.GetListAsync(payload));

    [HttpGet("options")]
    public async Task<IActionResult> OptionsAsync([FromQuery] string locale)
    {
        return Ok(await _context.Menus.Where(x => x.Locale == locale).OrderBy(x => x.Name).Select(x => new
        {
            label = x.Name,
            value = x.Id
        }).ToListAsync());
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Menu menu, [FromQuery] string locale)
    {
        try
        {
            menu.CreatedBy = User.GetUserName();
            menu.CreatedDate = DateTime.Now;
            menu.Locale = locale;
            return Ok(await _menuService.AddAsync(menu));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Menu menu)
    {
        var data = await _context.Menus.FindAsync(menu.Id);
        if (data is null) return BadRequest("Data not found!");
        data.ModifiedBy = User.GetUserName();
        data.ModifiedDate = DateTime.Now;
        data.Name = menu.Name;
        data.Description = menu.Description;
        data.Icon = menu.Icon;
        data.ParentId = menu.ParentId;
        data.Index = menu.Index;
        data.Url = menu.Url;
        data.Mode = menu.Mode;
        return Ok(await _menuService.UpdateAsync(data));
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _menuService.DeleteAsyn(id));

    [Route("parrent-list")]
    public async Task<IActionResult> ListParrentAsync(MenuType? type) => Ok(await _menuService.GetListParrentAsync(type));
}
