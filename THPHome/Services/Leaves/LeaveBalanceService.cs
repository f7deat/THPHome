using THPCore.Interfaces;
using THPCore.Models;
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

    public async Task<THPResult> UpdateAvailableDaysAsync(int leaveTypeId, double totalDays)
    {
        var balance = await _leaveBalanceRepository.GetBalanceByTypeAsync(_hcaService.GetUserName(), leaveTypeId);
        if (balance == null) return THPResult.Failed("Không tìm thấy số ngày nghỉ phép!");
        if (balance.AvailableDays < totalDays) return THPResult.Failed("Số ngày nghỉ phép không đủ!");
        balance.AvailableDays -= totalDays;
        await _leaveBalanceRepository.UpdateAsync(balance);
        return THPResult.Success;
    }
}
