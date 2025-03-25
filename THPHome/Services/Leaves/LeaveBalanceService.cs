using THPCore.Interfaces;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Interfaces.IService.ILeaves;

namespace THPHome.Services.Leaves;

public class LeaveBalanceService(ILeaveBalanceRepository _leaveBalanceRepository, ILeaveTypeRepository _leaveTypeRepository, IHCAService _hcaService) : ILeaveBalanceService
{
    public async Task<LeaveBalance?> GetBalanceByTypeAsync(int id)
    {
        var leaveType = await _leaveTypeRepository.FindAsync(id);
        if (leaveType is null) return default;
        var userName = _hcaService.GetUserName();
        return await _leaveBalanceRepository.GetBalanceByTypeAsync(userName, leaveType.Id);
    }
}
