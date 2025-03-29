using THPCore.Models;
using THPHome.Entities;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IDepartmentService
{
    Task<Department?> GetByIdAsync(int? departmentId);
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
    Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions);
}
