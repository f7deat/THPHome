using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.ComponentModel;

namespace THPHome.Interfaces.IRepository.IUsers;

public interface IDepartmentRepository : IAsyncRepository<Department>
{
    Task<IEnumerable<SelectOption>> GetCodeOptionsAsync();
}
