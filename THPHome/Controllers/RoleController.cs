using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using THPCore.Models;
using THPHome.Data;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;
using THPIdentity.Entities;
using WebUI.Foundations;

namespace THPHome.Controllers;

public class RoleController(RoleManager<ApplicationRole> _roleManager, ApplicationDbContext context, IUserService _userService) : BaseController(context)
{
    [HttpGet("all")]
    public async Task<IActionResult> ListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _roleManager.Roles
                    select new
                    {
                        a.Id,
                        a.Name,
                        a.DisplayName,
                        a.NormalizedName
                    };
        query = query.OrderBy(x => x.NormalizedName);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpDelete("{roleId}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] string roleId)
    {
        var role = await _roleManager.FindByIdAsync(roleId);
        if (role is null) return BadRequest("Không tìm thấy quyền!");
        return Ok(await _roleManager.DeleteAsync(role));
    }

    [HttpGet("users")]
    public async Task<IActionResult> ListUserInRoleAsync([FromQuery] UserInRoleFilterOptions filterOptions) => Ok(await _userService.ListUserInRoleAsync(filterOptions));
}
