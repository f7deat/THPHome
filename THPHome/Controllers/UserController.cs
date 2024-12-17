using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using WebUI.Models.Api.Admin.Users;
using Newtonsoft.Json;
using Microsoft.AspNetCore.WebUtilities;
using WebUI.Models.Api.Admin.User;
using Microsoft.EntityFrameworkCore;
using WebUI.Models.Filters.Users;
using WebUI.Models.ViewModel;
using WebUI.Foundations;
using WebUI.ExternalAPI.Interfaces;
using THPCore.Helpers;
using THPCore.Enums;
using System.IdentityModel.Tokens.Jwt;
using THPIdentity.Entities;
using THPHome.Models.Roles;
using THPHome.Data;
using THPCore.Extensions;
using ApplicationCore.Models.Filters;

namespace THPHome.Controllers;

public class UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, ApplicationDbContext context, ITHPAuthen thpAuthen) : BaseController(context)
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
    private readonly IConfiguration _configuration = configuration;
    private readonly ITHPAuthen _thpAuthen = thpAuthen;

    [Route("get/{id?}")]
    public async Task<IActionResult> GetAsync([FromRoute] string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            var result = new ApplicationUser
            {
                Email = user.Email,
                Id = user.Id,
                UserName = user.UserName
            };
            return Ok(result);
        }
        return Ok(await _userManager.FindByIdAsync(id));
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user is null) return Unauthorized();
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new
        {
            user.Id,
            user.UserName,
            user.Email,
            user.Avatar,
            user.PhoneNumber,
            user.DepartmentId,
            user.UserType,
            user.Name,
            roles
        });
    }

    [HttpGet("detail/{id}")]
    public async Task<IActionResult> GetDetailAsync([FromRoute] Guid id)
    {
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user is null) return Unauthorized();
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new
        {
            user.Id,
            user.UserName,
            user.Email,
            user.Avatar,
            user.PhoneNumber,
            user.DepartmentId,
            user.UserType,
            user.Name,
            roles,
            user.EmailConfirmed,
            user.Address,
            user.PhoneNumberConfirmed,
            user.LockoutEnabled,
            user.LockoutEnd,
            user.TwoFactorEnabled
        });
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetList([FromQuery] UserFilterOptions filterOptions)
    {
        var query = _userManager.Users.Select(x => new ApplicationUser
        {
            Email = x.Email,
            Id = x.Id,
            Name = x.Name,
            Avatar = x.Avatar,
            EmailConfirmed = x.EmailConfirmed,
            PhoneNumber = x.PhoneNumber,
            UserName = x.UserName,
            PhoneNumberConfirmed = x.PhoneNumberConfirmed,
            Gender = x.Gender,
            Address = x.Address,
            Amount = x.Amount,
            DateOfBirth = x.DateOfBirth,
            UserType = x.UserType
        });
        if (!string.IsNullOrWhiteSpace(filterOptions.UserName))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.UserName) && x.UserName.ToLower().Contains(filterOptions.UserName.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.Name))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.Name) && x.Name.ToLower().Contains(filterOptions.Name.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.Email))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.Email) && x.Email.ToLower().Contains(filterOptions.Email.ToLower()));
        }
        return Ok(await ListResult<ApplicationUser>.Success(query, filterOptions));
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
        if (string.IsNullOrWhiteSpace(addToRole.RoleName)) return BadRequest("Role name is required!");
        return Ok(await _userManager.AddToRoleAsync(user, addToRole.RoleName));
    }

    [Route("get-users-in-role/{roleName}")]
    public async Task<IActionResult> GetUsersInRole([FromRoute] string roleName) => Ok(await _userManager.GetUsersInRoleAsync(roleName));

    [Route("is-authenticated"), AllowAnonymous]
    public IActionResult IsAuthenticated() => Ok(User.Identity?.IsAuthenticated ?? false);

    [HttpDelete("remove-from-role/{role}/{id}")]
    public async Task<IActionResult> DeleteA([FromRoute] string role, [FromRoute] string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user is null) return BadRequest("User not found!");
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
            if (user is null) return BadRequest("User not found!");
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
        if (user is null) return BadRequest("User not found!");
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
        var user = await _userManager.FindByIdAsync(User.GetId());
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
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user == null)
        {
            return NotFound();
        }

        return Ok(await _userManager.SetTwoFactorEnabledAsync(user, false));
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordModel input)
    {
        var user = await _userManager.FindByIdAsync(User.GetId());
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
        var user = await _userManager.FindByIdAsync(User.GetId());
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
        if (string.IsNullOrWhiteSpace(args.PasswordHash)) return BadRequest("Vui lòng nhập mật khẩu");
        var user = new ApplicationUser
        {
            UserName = args.UserName,
            Email = args.Email,
            Name = args.Name
        };
        return Ok(await _userManager.CreateAsync(user, args.PasswordHash));
    }

    [HttpPost("password-sign-in"), AllowAnonymous]
    public async Task<IActionResult> PasswordSignInAsync([FromBody] LoginModel login)
    {
        var result = await _signInManager.PasswordSignInAsync(login.UserName, login.Password, false, false);
        if (result.Succeeded)
        {
            var user = await _userManager.FindByNameAsync(login.UserName);
            if (user is null) return BadRequest($"User {login.UserName} not found!");
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString(), ClaimValueTypes.String),
                new(ClaimTypes.Name, user.UserName ?? string.Empty, ClaimValueTypes.String),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole, ClaimValueTypes.String));
            }

            var secretCode = _configuration["JWT:Secret"];
            if (string.IsNullOrEmpty(secretCode)) return BadRequest($"Secret code not found!");

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretCode));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(7),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            var generatedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = generatedToken,
                expiration = token.ValidTo,
                succeeded = true
            });
        }
        else
        {
            var thpUser = await _thpAuthen.LoginAsync(login.UserName, login.Password);
            if (thpUser is null) return BadRequest("Tài khoản hoặc mật khẩu không đúng!");
            if (thpUser.UserType == 0) return BadRequest("Bạn không có quyền truy cập vào hệ thống!");
            var user = await _userManager.FindByNameAsync(login.UserName);
            if (user is null)
            {
                user = new ApplicationUser
                {
                    UserName = login.UserName,
                    Name = $"{thpUser.LastName} {thpUser.FirstName}",
                    Email = thpUser.Email,
                    PhoneNumber = thpUser.PhoneNumber,
                    DepartmentId = thpUser.DepartmentId,
                    UserType = thpUser.UserType,
                    Address = thpUser.Address,
                    Gender = thpUser.Gender,
                    DateOfBirth = thpUser.DateOfBirth
                };
                await _userManager.CreateAsync(user);
            }
            else
            {
                user.DepartmentId = thpUser.DepartmentId;
                user.Name = $"{thpUser.LastName} {thpUser.FirstName}";
                user.UserType = thpUser.UserType;
                user.PhoneNumber = thpUser.PhoneNumber;
                user.Email = thpUser.Email;
                user.Address = thpUser.Address;
                user.Gender = thpUser.Gender;
                user.DateOfBirth = thpUser.DateOfBirth;
                await _userManager.UpdateAsync(user);
            }

            var authClaims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString(), ClaimValueTypes.String),
                new(ClaimTypes.Name, user.UserName ?? string.Empty, ClaimValueTypes.String),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole, ClaimValueTypes.String));
            }

            var secretCode = _configuration["JWT:Secret"];
            if (string.IsNullOrEmpty(secretCode)) return BadRequest($"Secret code not found!");

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretCode));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(7),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            var generatedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = generatedToken,
                expiration = token.ValidTo,
                succeeded = true
            });
        }
    }

    #region Role
    [HttpGet("roles/{userId}")]
    public async Task<IActionResult> GetRolesAsync([FromRoute] string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user is null) return BadRequest("User not found!");
        return Ok(await _userManager.GetRolesAsync(user));
    }
    #endregion

    [HttpGet("type/options")]
    public IActionResult GetUserTypeOptions() => Ok(EnumHelper.EnumToList<UserType>().Select(x => new
    {
        label = EnumHelper.GetEnumDisplayName(x),
        value = x
    }));

    [HttpGet("my-notifications")]
    public async Task<IActionResult> GetMyNotificationsAsync([FromQuery] FilterOptions filterOptions)
    {
        var userName = User.GetUserName();
        var query = from a in _context.Notifications
                    join b in _context.UserNotifications on a.Id equals b.NotificationId
                    where b.Recipient == userName
                    select new
                    {
                        b.Id,
                        a.Title,
                        a.Content,
                        a.CreatedDate,
                        a.ModifiedDate,
                        b.IsRead,
                        b.NotificationId
                    };
        return Ok(new
        {
            data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync(),
            total = await query.CountAsync()
        });
    }
}
