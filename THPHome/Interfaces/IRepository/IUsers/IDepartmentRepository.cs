using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IRepository.IUsers;

public interface IDepartmentRepository : IAsyncRepository<Department>
{
    Task<Department?> GetByIdAsync(int? departmentId);
    Task<IEnumerable<SelectOption>> GetCodeOptionsAsync();
    Task<ListResult<object>> UsersAsync(DepartmentUserFilterOptions filterOptions);
}
