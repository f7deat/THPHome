using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;
using THPHome.Repositories.Base;
using THPIdentity.Entities;

namespace THPHome.Repositories.Users;

public class DepartmentRepository(ApplicationDbContext context, UserManager<ApplicationUser> _userManager) : EfRepository<Department>(context), IDepartmentRepository
{
    public async Task<int> CountStaffAsync(int departmentId) => await _userManager.Users.CountAsync(x => x.DepartmentId == departmentId && x.UserType != UserType.Student && x.Status != UserStatus.Inactive);

    public async Task<int> CountStudentAsync(int departmentId) => await _userManager.Users.CountAsync(x => x.DepartmentId == departmentId && x.UserType == UserType.Student && x.Status != UserStatus.Inactive);

    public async Task<Department?> GetByIdAsync(int? departmentId) => await _context.Departments.FirstOrDefaultAsync(x => x.Code == departmentId);

    public async Task<IEnumerable<SelectOption>> GetOptionsAsync()
    {
        return await _context.Departments.Select(x => new SelectOption
        {
            Label = x.Name,
            Value = x.Id
        }).ToListAsync();
    }

    public async Task<ListResult<object>> ListAcademicProgramAsync(int? departmentId, FilterOptions filterOptions)
    {
        var query = from a in _context.AcademicPrograms
                    join b in _context.Posts on a.PostId equals b.Id
                    where b.DepartmentId == departmentId && b.Locale == filterOptions.Locale
                    select new
                    {
                        a.Id,
                        b.Description,
                        b.CreatedDate,
                        b.CreatedBy,
                        b.ModifiedDate,
                        b.ModifiedBy,
                        b.Status,
                        b.View,
                        a.PostId,
                        a.Code,
                        b.Title,
                        b.Url,
                        a.SortOrder
                    };
        return await ListResult<object>.Success(query, filterOptions);
    }

    public async Task<object?> ListAllAsync(string locale = "vi-VN")
    {
        var query = from a in _context.Departments
                    select new
                    {
                        a.Id,
                        a.Name
                    };
        return await query.OrderBy(x => x.Name).ToListAsync();
    }

    public async Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions)
    {
        var query = from a in _userManager.Users
                    where a.UserType != UserType.Student && a.Status != UserStatus.Inactive
                    select new
                    {
                        a.Id,
                        a.UserName,
                        a.Email,
                        a.PhoneNumber,
                        a.Name,
                        a.Avatar,
                        a.DepartmentId,
                        a.Gender,
                        a.Status
                    };
        if (filterOptions.Code != null)
        {
            query = query.Where(x => x.DepartmentId == filterOptions.Code);
        }
        if (!string.IsNullOrEmpty(filterOptions.Name))
        {
            query = query.Where(x => x.Name.ToLower().Contains(filterOptions.Name.ToLower()));
        }
        query = query.OrderBy(x => x.UserName);
        return await ListResult<object>.Success(query, filterOptions);
    }
}
