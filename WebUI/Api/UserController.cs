using ApplicationCore.Constants;
using ApplicationCore.Interfaces.IService;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Models.Api.Admin.User;
using WebUI.Models.Roles;

namespace WebUI.Api
{
    [Authorize, Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [Route("get/{id?}")]
        public async Task<IActionResult> GetAsync([FromRoute]string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                var user = await _userManager.GetUserAsync(User);
                var result = new ApplicationUser();
                result.Email = user.Email;
                result.Id = user.Id;
                result.UserName = user.UserName;
                return Ok(result);
            }
            return Ok(await _userManager.FindByIdAsync(id));
        }

        [Route("get-list")]
        public IActionResult GetList() => Ok(_userManager.Users);

        [Route("add-to-role"), HttpPost]
        public async Task<IActionResult> AddToRoleAsync([FromBody]AddToRole addToRole)
        {
            var user = await _userManager.FindByIdAsync(addToRole.Id);
            return Ok(await _userManager.AddToRoleAsync(user, addToRole.RoleName));
        }

        [Route("get-users-in-role/{roleName}")]
        public async Task<IActionResult> GetUsersInRole([FromRoute]string roleName) => Ok(await _userManager.GetUsersInRoleAsync(roleName));

        [Route("is-authenticated"), AllowAnonymous]
        public IActionResult IsAuthenticated() => Ok(User.Identity.IsAuthenticated);

        [Route("change-password")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            return Ok(await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword));
        }
    }
}
