using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Interfaces.IService.ILeaves;
using THPHome.Models.ComponentModel;

namespace THPHome.Services.Leaves;

public class LeaveTypeService(ILeaveTypeRepository _leaveTypeRepository) : ILeaveTypeService
{
    public async Task<IEnumerable<SelectOption>> GetOptionsAsync() => await _leaveTypeRepository.GetOptionsAsync();
}
