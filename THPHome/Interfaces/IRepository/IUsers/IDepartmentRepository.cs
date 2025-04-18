using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IRepository.IUsers;

public interface IDepartmentRepository : IAsyncRepository<Department>
{
    Task<int> CountStaffAsync(int departmentId);
    Task<int> CountStudentAsync(int departmentId);
    Task<Department?> GetByIdAsync(int? departmentId);
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
    Task<ListResult<object>> ListAcademicProgramAsync(int? departmentId, FilterOptions filterOptions);
    Task<object?> ListAllAsync(string locale);
    Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions);
}
