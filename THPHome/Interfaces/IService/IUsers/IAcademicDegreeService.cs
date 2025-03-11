
using THPHome.Models.ComponentModel;

namespace THPHome.Interfaces.IService.IUsers;

public interface IAcademicDegreeService
{
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
}
