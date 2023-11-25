using ApplicationCore.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebUI.Models.Api.Admin.Roles;
using WebUI.Models.Api.Admin.Users;
using Newtonsoft.Json;
using Microsoft.AspNetCore.WebUtilities;
using WebUI.Models.Api.Admin.User;
using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebUI.Api
{
    [Route("api/[controller]"), Authorize]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [Route("get/{id?}")]
        public async Task<IActionResult> GetAsync([FromRoute] string id)
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

        [HttpGet("list")]
        public async Task<IActionResult> GetList([FromQuery] string searchTerm)
        {
            searchTerm = searchTerm ?? string.Empty;
            searchTerm = searchTerm.Trim().ToLower();
            return Ok(await _userManager.Users.Where(x => string.IsNullOrEmpty(searchTerm)
         || x.UserName.ToLower().Contains(searchTerm) || (
         !string.IsNullOrEmpty(x.Name) &&
         x.Name.ToLower().Contains(searchTerm)
         )).ToListAsync());
        }

        [HttpPost("add-to-role")]
        public async Task<IActionResult> AddToRoleAsync([FromBody] AddToRole addToRole)
        {
            var user = await _userManager.FindByIdAsync(addToRole.UserId);
            if (user == null)
            {
                return Ok(new
                {
                    succeeded = false,
                    errors = new List<dynamic> {
                        new { description = "User not found!" }
                    }
                });
            }
            return Ok(await _userManager.AddToRoleAsync(user, addToRole.RoleName));
        }

        [Route("get-users-in-role/{roleName}")]
        public async Task<IActionResult> GetUsersInRole([FromRoute] string roleName) => Ok(await _userManager.GetUsersInRoleAsync(roleName));

        [Route("is-authenticated"), AllowAnonymous]
        public IActionResult IsAuthenticated() => Ok(User.Identity.IsAuthenticated);

        [HttpDelete("remove-from-role/{role}/{id}")]
        public async Task<IActionResult> DeleteA([FromRoute] string role, [FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return Ok(await _userManager.RemoveFromRoleAsync(user, role));
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user is null)
            {
                return BadRequest("Người dùng không tồn tại!");
            }
            await _userManager.DeleteAsync(user);
            return Ok(IdentityResult.Success);
        }

        [HttpPost("get-authentication-token"), AllowAnonymous]
        public async Task<IActionResult> GetAuthenticationTokenAsync([FromBody] LoginModel login)
        {
            var result = await _signInManager.PasswordSignInAsync(login.UserName, login.Password, false, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(login.UserName);
                var token = await _userManager.GetAuthenticationTokenAsync(user, "", "DefToken");
                return Ok(token);
            }
            return Ok(result);
        }

        [HttpGet("access-token-for-user"), AllowAnonymous]
        public async Task<IActionResult> GetAccessTokenForUserAsync()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var user = await _userManager.FindByEmailAsync("f7deat@gmail.com");
            var key = Encoding.ASCII.GetBytes(Guid.NewGuid().ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenCreated = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(tokenCreated)
            });
        }

        [HttpPost("delete-personal-data")]
        public async Task<IActionResult> DeletePersonalDataAsync([FromBody] string password)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var hasPassword = await _userManager.HasPasswordAsync(user);
            if (hasPassword)
            {
                if (!await _userManager.CheckPasswordAsync(user, password))
                {
                    return Ok(new { succeeded = false, message = "Incorrect password" });
                }
            }

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                await _signInManager.SignOutAsync();
            }
            return Ok(result);
        }

        [HttpPost("disable-2fa")]
        public async Task<IActionResult> Disable2faAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(await _userManager.SetTwoFactorEnabledAsync(user, false));
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordModel input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, input.CurrentPassword, input.NewPassword);
            if (changePasswordResult.Succeeded)
            {
                await _signInManager.RefreshSignInAsync(user);
            }
            return Ok(changePasswordResult);
        }

        [HttpPost("download-personal-data")]
        public async Task<IActionResult> DownloadPersonalDataAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            // Only include personal data for download
            var personalData = new Dictionary<string, string>();
            var personalDataProps = typeof(ApplicationUser).GetProperties().Where(
                            prop => Attribute.IsDefined(prop, typeof(PersonalDataAttribute)));
            foreach (var p in personalDataProps)
            {
                personalData.Add(p.Name, p.GetValue(user)?.ToString() ?? "null");
            }

            Response.Headers.Add("Content-Disposition", "attachment; filename=PersonalData.json");
            return new FileContentResult(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(personalData)), "text/json");
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmailAsync([FromBody] ConfirmEmailModel input)
        {
            if (string.IsNullOrEmpty(input.UserId) || string.IsNullOrEmpty(input.Code))
            {
                return Ok(new { succeeded = true, message = "succeeded" });
            }

            var user = await _userManager.FindByIdAsync(input.UserId);
            if (user == null)
            {
                return NotFound();
            }

            input.Code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(input.Code));
            return Ok(await _userManager.ConfirmEmailAsync(user, input.Code));
        }

        [HttpGet("set-password")]
        public async Task<IActionResult> SetPasswordAsync([FromQuery] SetPasswordModel args)
        {
            var user = await _userManager.FindByNameAsync(args.UserName);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, args.Password);
            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("select")]
        public async Task<IActionResult> SelectAsync()
        {
            return Ok(await _userManager.Users.Select(x => new
            {
                label = x.Name ?? x.UserName + " - " + x.Email,
                value = x.Id
            }).ToListAsync());
        }

        [HttpGet("init"), AllowAnonymous]
        public async Task<IActionResult> InitAsync()
        {
            var user = new ApplicationUser
            {
                Name = "Đinh Công Tân",
                UserName = "tandc",
                Email = "defzone.net@gmail.com"
            };
            var user2 = new ApplicationUser
            {
                Name = "Nguyễn Ngọc Khương",
                UserName = "khuongnn",
                Email = "khuongnn@dhhp.edu.vn"
            };
            var role = new IdentityRole
            {
                Name = RoleName.ADMIN
            };
            await _userManager.CreateAsync(user, "Password@123");
            await _userManager.CreateAsync(user2, "Password@123");
            await _roleManager.CreateAsync(role);
            await _userManager.AddToRoleAsync(user, RoleName.ADMIN);
            await _userManager.AddToRoleAsync(user2, RoleName.ADMIN);
            return Ok();
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] ApplicationUser args)
        {
            var user = await _userManager.FindByIdAsync(args.Id);
            if (user is null)
            {
                return Ok(IdentityResult.Failed(new IdentityError
                {
                    Description = "User not found!"
                }));
            }
            user.Name = args.Name;
            user.Avatar = args.Avatar;
            return Ok(await _userManager.UpdateAsync(user));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync([FromBody] ApplicationUser args)
        {
            var user = new ApplicationUser
            {
                UserName = args.UserName,
                Email = args.Email,
                Name = args.Name
            };
            return Ok(await _userManager.CreateAsync(user));
        }

        #region Role
        [HttpGet("roles/{userId}")]
        public async Task<IActionResult> GetRolesAsync([FromRoute] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return Ok(await _userManager.GetRolesAsync(user));
        }
        #endregion
    }
}
