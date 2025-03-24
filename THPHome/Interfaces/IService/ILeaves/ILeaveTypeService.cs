using THPHome.Models.ComponentModel;

namespace THPHome.Interfaces.IService.ILeaves;

public interface ILeaveTypeService
{
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
}
