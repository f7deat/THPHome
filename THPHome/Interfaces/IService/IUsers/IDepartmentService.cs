using THPCore.Models;
using THPHome.Entities;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IDepartmentService
{
    Task<int> CountStaffAsync(int departmentId);
    Task<int> CountStudentAsync(int departmentId);
    Task<object?> CurrentUserOptionsAsync();
    Task<Department?> FindAsync(Guid id);
    Task<Department?> GetByIdAsync(int? departmentId);
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
    Task<ListResult<object>> ListAcademicProgramAsync(FilterOptions filterOptions);
    Task<object?> ListAllAsync(string locale = "vi-VN");
    Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions);
}
