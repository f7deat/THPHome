﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;
using THPHome.Repositories.Base;
using THPIdentity.Entities;

namespace THPHome.Repositories.Users;

public class DepartmentRepository(ApplicationDbContext context, UserManager<ApplicationUser> _userManager) : EfRepository<Department>(context), IDepartmentRepository
{
    public async Task<Department?> GetByIdAsync(int? departmentId) => await _context.Departments.FirstOrDefaultAsync(x => x.Code == departmentId);

    public async Task<IEnumerable<SelectOption>> GetCodeOptionsAsync()
    {
        return await _context.Departments.Select(x => new SelectOption
        {
            Label = x.Name,
            Value = x.Id
        }).ToListAsync();
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
