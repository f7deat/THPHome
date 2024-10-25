using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using THPIdentity.Constants;
using THPIdentity.Entities;
using WebUI.Foundations;

namespace WebUI.Controllers;

public class RoleController : BaseController
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext context) : base(context)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [Route("get-list")]
    public IActionResult GetList() => Ok(_roleManager.Roles);

    [Route("run-seed"), HttpPost]
    public async Task<IActionResult> RunSeedAsync()
    {
        var role = new IdentityRole
        {
            Name = RoleName.ADMIN
        };
        await _roleManager.CreateAsync(role);
        role.Name = RoleName.EDITOR;
        return Ok(await _roleManager.CreateAsync(role));
    }

    [Route("delete/{roleId}"), HttpPost]
    public async Task<IActionResult> DeleteAsync([FromRoute] string roleId)
    {
        var role = await _roleManager.FindByIdAsync(roleId);
        if (role is null) return BadRequest("Không tìm thấy quyền!");
        return Ok(await _roleManager.DeleteAsync(role));
    }
}
