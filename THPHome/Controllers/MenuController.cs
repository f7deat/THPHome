using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters;
using THPHome.Models.Payload;

namespace THPHome.Controllers;

public class MenuController(IMenuService _menuService, ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list"), AllowAnonymous]
    public async Task<IActionResult> GetListAsync([FromQuery] MenuFilterOptions filterOptions) => Ok(await _menuService.GetListAsync(filterOptions));

    [HttpGet("options")]
    public async Task<IActionResult> OptionsAsync([FromQuery] Select args)
    {
        var query = _context.Menus.Where(x => x.Locale == args.Locale);
        if (!string.IsNullOrEmpty(args.KeyWords))
        {
            query = query.Where(x => x.Name.ToLower().Contains(args.KeyWords.ToLower()));
        }
        if (args.DepartmentId != null)
        {
            query = query.Where(x => x.DepartmentId == args.DepartmentId);
        }
        return Ok(await query.OrderBy(x => x.Name).Select(x => new
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
        if (menu.Id == menu.ParentId) return BadRequest("Menu cha không được chứa chính nó!");
        return Ok(await _menuService.UpdateAsync(menu));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _menuService.DeleteAsyn(id));

    [Route("parrent-list")]
    public async Task<IActionResult> ListParrentAsync(MenuType? type) => Ok(await _menuService.GetListParrentAsync(type));
}
