﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;
using THPIdentity.Entities;

namespace THPHome.Services.Users;

public class DepartmentService(IDepartmentRepository _departmentRepository, IHCAService _hcaService, UserManager<ApplicationUser> _userManager) : IDepartmentService
{
    public Task<int> CountStaffAsync(int departmentId) => _departmentRepository.CountStaffAsync(departmentId);

    public Task<int> CountStudentAsync(int departmentId) => _departmentRepository.CountStudentAsync(departmentId);

    public async Task<object?> CurrentUserOptionsAsync()
    {
        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return default;
        return await _userManager.Users.Where(x => x.Status != UserStatus.Inactive && x.UserType != UserType.Student && x.DepartmentId == user.DepartmentId).Select(x => new
        {
            label = $"{x.Name} - {x.UserName}",
            value = x.UserName
        }).ToListAsync();
    }

    public Task<Department?> FindAsync(Guid id) => _departmentRepository.FindAsync(id);

    public Task<Department?> GetByIdAsync(int? departmentId) => _departmentRepository.GetByIdAsync(departmentId);

    public Task<IEnumerable<SelectOption>> GetOptionsAsync() => _departmentRepository.GetOptionsAsync();

    public async Task<ListResult<object>> ListAcademicProgramAsync(FilterOptions filterOptions)
    {
        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return new ListResult<object>([], 0, filterOptions);
        return await _departmentRepository.ListAcademicProgramAsync(user.DepartmentId, filterOptions);
    }

    public Task<object?> ListAllAsync(string locale = "vi-VN") => _departmentRepository.ListAllAsync(locale);

    public Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions) => _departmentRepository.UsersAsync(filterOptions);
}
