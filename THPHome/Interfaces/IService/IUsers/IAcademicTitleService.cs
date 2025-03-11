
using THPHome.Models.ComponentModel;

namespace THPHome.Interfaces.IService.IUsers;

public interface IAcademicTitleService
{
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
}
