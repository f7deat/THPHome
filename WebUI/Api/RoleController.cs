using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    [Authorize, Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;
        public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [Route("get-list")]
        public IActionResult GetList() => Ok(_roleManager.Roles);

        [Route("run-seed"), HttpPost]
        public async Task<IActionResult> RunSeedAsync()
        {
            var role = new IdentityRole();
            role.Name = "admin";
            await _roleManager.CreateAsync(role);
            role.Name = "member";
            return Ok(await _roleManager.CreateAsync(role));
        }

        [Route("delete/{roleId}"), HttpPost]
        public async Task<IActionResult> DeleteAsync([FromRoute]string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            return Ok(await _roleManager.DeleteAsync(role));
        }
    }
}
