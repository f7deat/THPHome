using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;
using THPHome.Models.Results.Users;
using THPHome.Services.Users.Models;
using THPIdentity.Entities;

namespace THPHome.Services;

public class UserService(UserManager<ApplicationUser> _userManager, ApplicationDbContext _context, IHCAService _hcaService, ILogService _logService) : IUserService
{
    public async Task<THPResult> DeactiveAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user is null) return THPResult.Failed("User not found");
        user.Status = UserStatus.Inactive;
        await _userManager.UpdateAsync(user);
        await _logService.AddAsync($"Vô hiệu hóa tài khoản: {user.UserName}");
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteNotificationAsync(Guid id)
    {
        var notification = await _context.UserNotifications.FindAsync(id);
        if (notification is null) return THPResult.Failed("Notification not found");
        if (notification.Recipient != _hcaService.GetUserName()) return THPResult.Failed("Can not delete other user notification");
        _context.UserNotifications.Remove(notification);
        await _context.SaveChangesAsync();
        return THPResult.Success;
    }

    public async Task<object?> GetLecturerPublicInfoAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if (user is null) return THPResult.Failed("User not found");
        var detail = await _context.UserDetails.FirstOrDefaultAsync(x => x.UserId == user.Id);
        if (detail is null)
        {
            detail = new Entities.Users.UserDetail
            {
                UserId = user.Id,
                Locale = "vi-VN"
            };
            await _context.UserDetails.AddAsync(detail);
            await _context.SaveChangesAsync();
        }

        var academicDegree = new Entities.Users.AcademicDegree();
        if (detail.AcademicDegreeId != null)
        {
            academicDegree = await _context.AcademicDegrees.FirstOrDefaultAsync(x => x.Id == detail.AcademicDegreeId);
        }
        var academicTitle = new Entities.Users.AcademicTitle();
        if (detail.AcademicTitleId != null)
        {
            academicTitle = await _context.AcademicTitles.FirstOrDefaultAsync(x => x.Id == detail.AcademicTitleId);
        }
        var department = new Department();
        if (user.DepartmentId != null)
        {
            department = await _context.Departments.FirstOrDefaultAsync(x => x.Code == user.DepartmentId);
        }
        var city = string.Empty;
        if (user.CityId != null)
        {
            city = (await _context.Cities.FirstOrDefaultAsync(x => x.Id == user.CityId))?.Name;
        }

        var languages = await _context.ForeignLanguageProficiencies.Where(x => x.UserName == userName).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Certificate,
            x.Level,
            x.Language
        }).ToListAsync();

        var educationHistories = await _context.EducationHistories.Where(x => x.UserName == userName).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Major,
            x.Degree,
            x.GraduationYear,
            x.Institution
        }).ToListAsync();

        var awards = await _context.Awards.Where(x => x.UserName == userName).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Year,
            x.Name
        }).ToListAsync();

        var researchProjects = await _context.ResearchProjects.Where(x => x.UserName == userName).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Name,
            x.StartYear,
            x.EndYear
        }).ToListAsync();

        var books = await _context.Books.Where(x => x.UserName == userName).OrderBy(x => x.PublishYear).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Name,
            x.Publisher,
            x.PublishYear,
            x.ISBN,
            x.Authors
        }).ToListAsync();

        var journals = await _context.Journals.Where(x => x.UserName == userName).OrderBy(x => x.PublishYear).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Name,
            x.PublishYear,
            x.ISSN,
            x.Volume,
            x.Authors,
            x.Page,
            x.Issue
        }).ToListAsync();

        var workingExperiences = await _context.WorkingExperiences.Where(x => x.UserName == userName).OrderByDescending(x => x.StartDate).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Position,
            x.CompanyName,
            x.StartDate,
            x.EndDate,
            x.Description
        }).ToListAsync();

        var teachingExperiences = await _context.TeachingExperiences.Where(x => x.UserName == userName).OrderByDescending(x => x.CourseCode).AsNoTracking().Select(x => new
        {
            x.Id,
            x.CourseCode,
            x.CourseName,
            x.Description,
            x.Level
        }).ToListAsync();

        var achievements = await _context.Achievements.Where(x => x.UserName == userName).OrderByDescending(x => x.Year).AsNoTracking().Select(x => new
        {
            x.Id,
            x.Name,
            x.Year,
        }).ToListAsync();

        return new
        {
            user.Id,
            user.Name,
            user.UserName,
            user.Email,
            user.PhoneNumber,
            user.Avatar,
            user.DateOfBirth,
            Gender = user.Gender != 0,
            detail.Position,
            detail.CurrentResidence,
            detail.CurrentWorkplace,
            detail.WorkplaceAddresss,
            detail.YearOfPromotion,
            detail.Address,
            detail.Website,
            detail.Facebook,
            detail.Linkedin,
            detail.Bio,
            AcademicDegree = new
            {
                academicDegree?.Id,
                academicDegree?.Name,
                academicDegree?.ShortName
            },
            AcademicTitle = new
            {
                academicTitle?.Id,
                academicTitle?.Name,
                academicTitle?.ShortName
            },
            Department = new
            {
                department?.Name,
                department?.Code
            },
            city,
            languages,
            awards,
            educationHistories,
            researchProjects,
            books,
            journals,
            teachingExperiences,
            workingExperiences,
            achievements
        };
    }

    public async Task<object?> ListLecturerAsync(UserFilterOptions filterOptions)
    {
        var query = from a in _userManager.Users.Where(x => x.UserType != UserType.Student)
                    select new
                    {
                        a.Id,
                        a.Name,
                        a.UserName,
                        a.Email,
                        a.PhoneNumber,
                        a.Gender,
                        a.DateOfBirth,
                        a.Avatar,
                        a.DepartmentId,
                        a.UserType
                    };

        query = query.Where(x => x.UserName != "admin@dhhp.edu.vn" && x.UserName != "btv@dhhp.edu.vn" && x.UserName != "admin.dhhp");

        if (!string.IsNullOrWhiteSpace(filterOptions.Name))
        {
            query = query.Where(x => x.Name.ToLower().Contains(filterOptions.Name.ToLower()));
        }

        if (filterOptions.DepartmentCode != null)
        {
            query = query.Where(x => x.DepartmentId == filterOptions.DepartmentCode);
        }

        var result = await query.OrderByDescending(x => x.UserType).ThenBy(x => x.UserName).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();
        var academicDegrees = await _context.AcademicDegrees.AsNoTracking().ToListAsync();
        var academicTitles = await _context.AcademicTitles.AsNoTracking().ToListAsync();
        var data = new List<ProfileListItem>();
        foreach (var item in result)
        {
            var listItem = new ProfileListItem
            {
                Id = item.Id,
                Name = item.Name,
                UserName = item.UserName,
                Email = item.Email,
                PhoneNumber = item.PhoneNumber,
                DateOfBirth = item.DateOfBirth,
                Gender = item.Gender != 0,
                Avatar = item.Avatar,
            };
            var detail = await _context.UserDetails.FirstOrDefaultAsync(x => x.UserId == item.Id);
            if (detail != null)
            {
                listItem.AcademicDegree = detail.AcademicDegreeId != null ? academicDegrees.FirstOrDefault(x => x.Id == detail.AcademicDegreeId)?.Name : null;
                listItem.AcademicTitle = detail.AcademicTitleId != null ? academicTitles.FirstOrDefault(x => x.Id == detail.AcademicTitleId)?.Name : null;
                listItem.Position = detail.Position;
            }
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Code == item.DepartmentId);
            if (department != null)
            {
                listItem.Department = department.Name;
            }

            data.Add(listItem);
        }

        return new { data, total = query.CountAsync() };
    }

    public async Task<object?> ListNotificationAsync(FilterOptions filterOptions)
    {
        var query = from a in _context.Notifications
                    join b in _context.UserNotifications on a.Id equals b.NotificationId
                    where b.Recipient == _hcaService.GetUserName()
                    select new
                    {
                        b.Id,
                        a.CreatedDate,
                        a.Title,
                        a.Type,
                        b.IsRead,
                        b.NotificationId
                    };
        query = query.OrderByDescending(x => x.CreatedDate);
        return await ListResult<object>.Success(query, filterOptions);
    }

    public async Task<ListResult<StaffListItem>> ListStaffAsync(UserFilterOptions filterOptions)
    {
        var query = _userManager.Users.Where(x => x.UserType != UserType.Student).Select(x => new StaffListItem
        {
            Avatar = x.Avatar,
            DateOfBirth = x.DateOfBirth,
            DepartmentId = x.DepartmentId,
            Name = x.Name,
            PhoneNumber = x.PhoneNumber,
            UserName = x.UserName,
            Gender = x.Gender == 1,
            Id = x.Id,
            Email = x.Email,
            Status = x.Status
        });
        if (!string.IsNullOrWhiteSpace(filterOptions.UserName))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.UserName) && x.UserName.ToLower().Contains(filterOptions.UserName.ToLower()));
        }
        if (!string.IsNullOrEmpty(filterOptions.Name))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.Name) && x.Name.ToLower().Contains(filterOptions.Name.ToLower()));
        }
        if (filterOptions.DepartmentId != null)
        {
            query = query.Where(x => x.DepartmentId == filterOptions.DepartmentId);
        }

        query = query.OrderBy(x => x.UserName);
        return await ListResult<StaffListItem>.Success(query, filterOptions);
    }

    public async Task<ListResult<object>> ListUserInRoleAsync(UserInRoleFilterOptions filterOptions)
    {
        var users = await _userManager.GetUsersInRoleAsync(filterOptions.RoleName);
        return new ListResult<object>(users, users.Count, filterOptions);
    }
}
