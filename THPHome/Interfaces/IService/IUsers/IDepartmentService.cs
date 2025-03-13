
using THPHome.Models.ComponentModel;

namespace THPHome.Interfaces.IService.IUsers;

public interface IDepartmentService
{
    Task<IEnumerable<SelectOption>> GetCodeOptionsAsync();
}
