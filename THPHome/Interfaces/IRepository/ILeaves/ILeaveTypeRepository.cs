using THPCore.Interfaces;
using THPHome.Entities.Leaves;
using THPHome.Models.ComponentModel;

namespace THPHome.Interfaces.IRepository.ILeaves;

public interface ILeaveTypeRepository : IAsyncRepository<LeaveType>
{
    Task<IEnumerable<SelectOption>> GetOptionsAsync();
}
