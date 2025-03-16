using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;

namespace THPHome.Services.Users;

public class DepartmentService(IDepartmentRepository _departmentRepository) : IDepartmentService
{
    public Task<Department?> GetByIdAsync(int? departmentId) => _departmentRepository.GetByIdAsync(departmentId);

    public Task<IEnumerable<SelectOption>> GetCodeOptionsAsync() => _departmentRepository.GetCodeOptionsAsync();

    public Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions) => _departmentRepository.UsersAsync(filterOptions);
}
