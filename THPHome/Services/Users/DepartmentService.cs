using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.ComponentModel;

namespace THPHome.Services.Users;

public class DepartmentService(IDepartmentRepository _departmentRepository) : IDepartmentService
{
    public Task<IEnumerable<SelectOption>> GetCodeOptionsAsync() => _departmentRepository.GetCodeOptionsAsync();
}
