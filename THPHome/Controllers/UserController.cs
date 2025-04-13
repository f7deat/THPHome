using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using WebUI.Foundations;
using WebUI.ExternalAPI.Interfaces;
using THPCore.Helpers;
using System.IdentityModel.Tokens.Jwt;
using THPIdentity.Entities;
using THPHome.Models.Roles;
using THPHome.Data;
using THPCore.Extensions;
using THPHome.Models.Api.Admin.User;
using THPHome.Models.Filters.Users;
using THPIdentity.Constants;
using THPHome.Helpers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Args.Users;
using WebUI.Interfaces.IService;
using THPHome.Entities.Users;
using ForeignLanguageProficiency = THPHome.Entities.Users.ForeignLanguageProficiency;
using THPHome.Models.Filters;
using THPHome.Models.ViewModel;

namespace THPHome.Controllers;

public class UserController(
    IAcademicTitleService _academicTitleService,
    IAcademicDegreeService _academicDegreeService,
    ITelegramService _telegramService,
    IWebHostEnvironment _webHostEnvironment,
    IEducationHistoryService _educationHistoryService,
    ITeachingExperienceService _teachingExperienceService,
    IResearchProjectService _researchProjectService,
    IDepartmentService _departmentService,
    IBookService _bookService,
    IJournalService _journalService,
    IAchievementService _achievementService,
    IWorkingExperienceService _workingExperienceService,
    UserManager<ApplicationUser> _userManager, IUserService _userService, SignInManager<ApplicationUser> _signInManager, IConfiguration _configuration, ApplicationDbContext context, ITHPAuthen thpAuthen) : BaseController(context)
{
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

    [HttpGet("post-count")]
    public async Task<IActionResult> GetPostCountAsync() => Ok(await _context.Posts.CountAsync(x => x.CreatedBy == User.GetId()));

    [HttpGet("view-count")]
    public async Task<IActionResult> GetViewCountAsync() => Ok(await _context.Posts.Where(x => x.CreatedBy == User.GetId()).SumAsync(x => x.View));

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

    [HttpGet("detail/{userName}")]
    public async Task<IActionResult> GetDetailAsync([FromRoute] string userName, [FromQuery] string locale)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user is null) return Unauthorized();
        var roles = await _userManager.GetRolesAsync(user);
        var userDetail = await _context.UserDetails.FirstOrDefaultAsync(x => x.UserId == user.Id);
        if (userDetail is null)
        {
            if (!LanguageHelper.IsAvailable(locale)) return BadRequest("Language not available!");
            await _context.UserDetails.AddAsync(new Entities.Users.UserDetail
            {
                UserId = user.Id,
                Locale = locale
            });
            await _context.SaveChangesAsync();
        }
        if (userDetail is null) return BadRequest("Detail not found!");

        var languages = await _context.ForeignLanguageProficiencies.Where(x => x.UserName == user.UserName).AsNoTracking().ToListAsync();

        return Ok(new
        {
            data = new
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
                user.TwoFactorEnabled,
                user.DateOfBirth,
                user.CityId,
                Gender = user.Gender != 0,
                userDetail.YearOfPromotion,
                userDetail.Position,
                userDetail.CurrentResidence,
                userDetail.CurrentWorkplace,
                userDetail.IdentityPlace,
                userDetail.IdentityDate,
                userDetail.IdentityNumber,
                userDetail.AcademicDegreeId,
                userDetail.AcademicTitleId,
                userDetail.Facebook,
                userDetail.Website,
                userDetail.Linkedin,
                userDetail.Bio,
                CountryId = user.CityId == null ? null : (await _context.Cities.Where(x => x.Id == user.CityId).FirstOrDefaultAsync())?.CountryId,
                languages
            }
        });
    }

    [HttpGet("foreign-language-proficiency/list"), AllowAnonymous]
    public async Task<IActionResult> GetForeignLanguageProficienciesAsync([FromQuery] UserFilterOptions filterOptions)
    {
        if (string.IsNullOrWhiteSpace(filterOptions.UserName)) return BadRequest("User name is required!");
        var user = await _userManager.FindByNameAsync(filterOptions.UserName);
        if (user is null) return BadRequest("User not found!");
        var query = _context.ForeignLanguageProficiencies.Where(x => x.UserName == user.UserName);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpPost("foreign-language-proficiency/add")]
    public async Task<IActionResult> AddForeignLanguageProficiencyAsync([FromBody] Entities.Users.ForeignLanguageProficiency args)
    {
        try
        {
            args.UserName = User.GetUserName();
            args.CreatedDate = DateTime.Now;
            await _context.ForeignLanguageProficiencies.AddAsync(args);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("foreign-language-proficiency/delete/{id}")]
    public async Task<IActionResult> ForeignLanguageProficiencyDeleteAsync([FromRoute] Guid id)
    {
        var data = await _context.ForeignLanguageProficiencies.FindAsync(id);
        if (data is null) return BadRequest("Data not found!");
        _context.ForeignLanguageProficiencies.Remove(data);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("foreign-language-proficiency/update")]
    public async Task<IActionResult> ForeignLanguageProficiencyUpdateAsync([FromBody] ForeignLanguageProficiency args)
    {
        try
        {
            var data = await _context.ForeignLanguageProficiencies.FindAsync(args.Id);
            if (data is null) return BadRequest("Data not found!");
            data.Language = args.Language;
            data.Level = args.Level;
            data.Certificate = args.Certificate;
            _context.Update(data);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("staff/list")]
    public async Task<IActionResult> ListStaffAsync([FromQuery] UserFilterOptions filterOptions) => Ok(await _userService.ListStaffAsync(filterOptions));

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
        if (filterOptions.UserType != null)
        {
            query = query.Where(x => x.UserType == filterOptions.UserType);
        }
        return Ok(await ListResult<ApplicationUser>.Success(query, filterOptions));
    }

    [HttpPost("add-to-role")]
    public async Task<IActionResult> AddToRoleAsync([FromBody] AddToRole addToRole)
    {
        var user = await _userManager.FindByIdAsync(addToRole.UserId);
        if (user is null) return BadRequest("User not found!");
        if (string.IsNullOrWhiteSpace(addToRole.RoleName)) return BadRequest("Role name is required!");
        var result = await _userManager.AddToRoleAsync(user, addToRole.RoleName);
        if (!result.Succeeded) return BadRequest(result.Errors.First().Description);
        return Ok();
    }

    [HttpGet("users-in-role/{roleName}")]
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

    [HttpPost("delete/{id}"), Authorize(Roles = RoleName.ADMIN)]
    public async Task<IActionResult> DeleteAsync([FromRoute] string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user is null) return BadRequest("Người dùng không tồn tại!");
        await _userManager.DeleteAsync(user);
        return Ok(IdentityResult.Success);
    }

    [HttpPost("get-authentication-token"), AllowAnonymous]
    public async Task<IActionResult> GetAuthenticationTokenAsync([FromBody] LoginModel login)
    {
        if (string.IsNullOrWhiteSpace(login.UserName) || string.IsNullOrWhiteSpace(login.Password)) return BadRequest("Vui lòng nhập tên đăng nhập hoặc mật khẩu!");
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
        if (string.IsNullOrWhiteSpace(input.CurrentPassword) || string.IsNullOrWhiteSpace(input.NewPassword)) return BadRequest("Vui lòng nhập mật khẩu!");
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
    public async Task<IActionResult> UpdateAsync([FromBody] UpdateUserArgs args)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            user.Name = args.Name;
            user.Address = args.Address;
            user.DateOfBirth = args.DateOfBirth;
            user.CityId = args.CityId;
            user.Gender = args.Gender == false ? 0 : 1;
            user.Email = args.Email;
            user.PhoneNumber = args.PhoneNumber;
            var detail = await _context.UserDetails.FirstOrDefaultAsync(x => x.UserId == user.Id);
            if (detail is null) return BadRequest("Detail not found!");
            detail.Position = args.Position;
            detail.CurrentResidence = args.CurrentResidence;
            detail.AcademicTitleId = args.AcademicTitleId;
            detail.AcademicDegreeId = args.AcademicDegreeId;
            detail.IdentityNumber = args.IdentityNumber;
            detail.IdentityDate = args.IdentityDate;
            detail.IdentityPlace = args.IdentityPlace;
            detail.Website = args.Website;
            detail.Facebook = args.Facebook;
            detail.Linkedin = args.Linkedin;
            detail.Address = args.Address;
            detail.Bio = args.Bio;
            await _userManager.UpdateAsync(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            await _telegramService.SendMessageAsync(ex.ToString());
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateAsync([FromBody] ApplicationUser args)
    {
        if (string.IsNullOrWhiteSpace(args.PasswordHash)) return BadRequest("Vui lòng nhập mật khẩu");
        if (!User.IsInRole(RoleName.ADMIN)) return BadRequest("Không có quyền thực hiện!");
        var user = new ApplicationUser
        {
            UserName = args.UserName,
            Email = args.Email,
            Name = args.Name,
            DepartmentId = args.DepartmentId,
            Gender = args.Gender,
            DateOfBirth = args.DateOfBirth,
            UserType = args.UserType,
            PhoneNumber = args.PhoneNumber,
            Address = args.Address,
            CityId = args.CityId,
            Status = UserStatus.Active
        };
        return Ok(await _userManager.CreateAsync(user, args.PasswordHash));
    }

    [HttpPost("password-sign-in"), AllowAnonymous]
    public async Task<IActionResult> PasswordSignInAsync([FromBody] LoginModel login)
    {
        if (string.IsNullOrWhiteSpace(login.UserName) || string.IsNullOrWhiteSpace(login.Password)) return BadRequest("Vui lòng nhập tên đăng nhập hoặc mật khẩu!");
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
                user.DepartmentId ??= thpUser.DepartmentId;
                if (!string.IsNullOrWhiteSpace(thpUser.PhoneNumber) && string.IsNullOrEmpty(user.PhoneNumber))
                {
                    user.PhoneNumber = thpUser.PhoneNumber;
                }
                if (!string.IsNullOrWhiteSpace(thpUser.Email) && string.IsNullOrEmpty(user.Email))
                {
                    user.Email = thpUser.Email;
                }
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
    public IActionResult GetUserTypeOptions() => Ok(EnumHelper.EnumToList<THPIdentity.Entities.UserType>().Select(x => new
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

    [HttpGet("lecturer/list"), AllowAnonymous]
    public async Task<IActionResult> ListLecturerAsync([FromQuery] UserFilterOptions filterOptions) => Ok(await _userService.ListLecturerAsync(filterOptions));

    [HttpGet("lecturer/public-info/{userName}"), AllowAnonymous]
    public async Task<IActionResult> GetLecturerPublicInfoAsync([FromRoute] string userName)
    {
        try
        {
            return Ok(await _userService.GetLecturerPublicInfoAsync(userName));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("academic-title/options")]
    public async Task<IActionResult> GetAcademicTitleOptionsAsync() => Ok(await _academicTitleService.GetOptionsAsync());

    [HttpGet("academic-degree/options")]
    public async Task<IActionResult> GetAcademicDegreeOptionsAsync() => Ok(await _academicDegreeService.GetOptionsAsync());

    [HttpPost("change-avatar")]
    public async Task<IActionResult> ChangeAvatarAsync([FromForm] IFormFile? file)
    {
        try
        {
            if (file is null) return BadRequest("File not found!");
            if (!file.ContentType.Contains("image")) return BadRequest("Định dạng tệp tin không được hỗ trợ!");
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            var rootPath = Path.Combine(_webHostEnvironment.WebRootPath, "avatars");
            var folder = user.UserName ?? "files";
            var folderPath = Path.Combine(rootPath, folder);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            var filePath = Path.Combine(folderPath, file.FileName);
            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }
            user.Avatar = $"https://dhhp.edu.vn/avatars/{folder}/{file.FileName}";
            await _userManager.UpdateAsync(user);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("education-history/list")]
    public async Task<IActionResult> GetEducationHistoryListAsync([FromQuery] UserFilterOptions filterOptions)
    {
        var query = _context.EducationHistories.AsQueryable();
        if (!string.IsNullOrWhiteSpace(filterOptions.UserName))
        {
            query = query.Where(x => x.UserName == filterOptions.UserName);
        }
        query = query.OrderBy(x => x.GraduationYear);
        return Ok(await ListResult<Entities.Users.EducationHistory>.Success(query, filterOptions));
    }

    [HttpPost("education-history/add")]
    public async Task<IActionResult> AddEducationHistoryAsync([FromBody] Entities.Users.EducationHistory args)
    {
        args.UserName = User.GetUserName();
        var result = await _educationHistoryService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("education-history/update")]
    public async Task<IActionResult> UpdateEducationHistoryAsync([FromBody] Entities.Users.EducationHistory args)
    {
        var result = await _educationHistoryService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("education-history/delete/{id}")]
    public async Task<IActionResult> DeleteEducationHistoryAsync([FromRoute] Guid id)
    {
        var result = await _educationHistoryService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("teaching-experience/list"), AllowAnonymous]
    public async Task<IActionResult> GetTeachingExperienceListAsync([FromQuery] UserFilterOptions filterOptions) => Ok(await _teachingExperienceService.ListAsync(filterOptions));

    [HttpPost("teaching-experience/add")]
    public async Task<IActionResult> AddTeachingExperienceAsync([FromBody] Entities.Users.TeachingExperience args)
    {
        args.UserName = User.GetUserName();
        var result = await _teachingExperienceService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("teaching-experience/update")]
    public async Task<IActionResult> ActionResult([FromBody] Entities.Users.TeachingExperience args)
    {
        var result = await _teachingExperienceService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("teaching-experience/delete/{id}")]
    public async Task<IActionResult> DeleteTeachingExperienceAsync([FromRoute] Guid id)
    {
        var result = await _teachingExperienceService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("research-project/list")]
    public async Task<IActionResult> GetResearchProjectListAsync([FromQuery] UserFilterOptions filterOptions)
    {
        var query = _context.ResearchProjects.AsQueryable();
        if (!string.IsNullOrWhiteSpace(filterOptions.UserName))
        {
            query = query.Where(x => x.UserName == filterOptions.UserName);
        }
        query = query.OrderBy(x => x.StartYear);
        return Ok(await ListResult<ResearchProject>.Success(query, filterOptions));
    }

    [HttpPost("research-project/add")]
    public async Task<IActionResult> AddResearchProjectAsync([FromBody] Entities.Users.ResearchProject args)
    {
        args.UserName = User.GetUserName();
        var result = await _researchProjectService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("research-project/update")]
    public async Task<IActionResult> UpdateResearchProjectAsync([FromBody] Entities.Users.ResearchProject args)
    {
        var result = await _researchProjectService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("research-project/delete/{id}")]
    public async Task<IActionResult> DeleteResearchProjectAsync([FromRoute] Guid id)
    {
        var result = await _researchProjectService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("my-department")]
    public async Task<IActionResult> MyDepartmentAsync()
    {
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user is null) return Unauthorized();
        if (user.DepartmentId is null) return Ok();
        return Ok(new { data = await _departmentService.GetByIdAsync(user.DepartmentId) });
    }

    [HttpGet("my-books")]
    public async Task<IActionResult> GetMyBooksAsync([FromQuery] BookFilterOptions filterOptions)
    {
        var query = _context.Books.Where(x => x.UserName == filterOptions.UserName).OrderBy(x => x.PublishYear);
        return Ok(await ListResult<Book>.Success(query, filterOptions));
    }

    [HttpPost("my-book/add")]
    public async Task<IActionResult> AddMyBookAsync([FromBody] Book args)
    {
        args.UserName = User.GetUserName();
        var result = await _bookService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-book/update")]
    public async Task<IActionResult> UpdateMyBookAsync([FromBody] Book args)
    {
        var result = await _bookService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-book/delete/{id}")]
    public async Task<IActionResult> DeleteMyBookAsync([FromRoute] Guid id)
    {
        var result = await _bookService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("my-journals")]
    public async Task<IActionResult> GetMyJournalsAsync([FromQuery] JournalFilterOptions filterOptions)
    {
        var query = _context.Journals.Where(x => x.UserName == filterOptions.UserName).OrderBy(x => x.PublishYear);
        return Ok(await ListResult<Journal>.Success(query, filterOptions));
    }

    [HttpPost("my-journal/add")]
    public async Task<IActionResult> AddMyJournalAsync([FromBody] Journal args)
    {
        args.UserName = User.GetUserName();
        var result = await _journalService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-journal/update")]
    public async Task<IActionResult> UpdateMyJournalAsync([FromBody] Journal args)
    {
        var result = await _journalService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-journal/delete/{id}")]
    public async Task<IActionResult> DeleteMyJournalAsync([FromRoute] Guid id)
    {
        var result = await _journalService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("my-achievements")]
    public async Task<IActionResult> GetMyAchievementsAsync([FromQuery] AchievementFilterOptions filterOptions)
    {
        var query = _context.Achievements.Where(x => x.UserName == filterOptions.UserName).OrderByDescending(x => x.Year);
        return Ok(await ListResult<Achievement>.Success(query, filterOptions));
    }

    [HttpPost("my-achievement/add")]
    public async Task<IActionResult> AddMyAchievementAsync([FromBody] Achievement args)
    {
        args.UserName = User.GetUserName();
        var result = await _achievementService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-achievement/update")]
    public async Task<IActionResult> UpdateMyAchievementAsync([FromBody] Achievement args)
    {
        var result = await _achievementService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-achievement/delete/{id}")]
    public async Task<IActionResult> DeleteMyAchievementAsync([FromRoute] Guid id)
    {
        var result = await _achievementService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("my-working-experiences")]
    public async Task<IActionResult> GetMyWorkingExperiencesAsync([FromQuery] WorkingExperienceFilterOptions filterOptions)
    {
        var query = _context.WorkingExperiences.Where(x => x.UserName == filterOptions.UserName).OrderBy(x => x.StartDate);
        return Ok(await ListResult<WorkingExperience>.Success(query, filterOptions));
    }

    [HttpPost("my-working-experience/add")]
    public async Task<IActionResult> AddMyWorkingExperienceAsync([FromBody] WorkingExperience args)
    {
        args.UserName = User.GetUserName();
        var result = await _workingExperienceService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-working-experience/update")]
    public async Task<IActionResult> UpdateMyWorkingExperienceAsync([FromBody] WorkingExperience args)
    {
        var result = await _workingExperienceService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("my-working-experience/delete/{id}")]
    public async Task<IActionResult> DeleteMyWorkingExperienceAsync([FromRoute] Guid id)
    {
        var result = await _workingExperienceService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("list-notification")]
    public async Task<IActionResult> ListNotificationAsync([FromQuery] FilterOptions filterOptions) => Ok(await _userService.ListNotificationAsync(filterOptions));

    [HttpPost("deactivate/{id}"), Authorize(Roles = RoleName.ADMIN)]
    public async Task<IActionResult> DeactiveAsync([FromRoute] string id)
    {
        var result = await _userService.DeactiveAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpDelete("notification/{id}")]
    public async Task<IActionResult> DeleteNotificationAsync([FromRoute] Guid id)
    {
        var result = await _userService.DeleteNotificationAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

}
