using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Leaves;

namespace THPHome.Interfaces.IRepository.ILeaves;

public interface ILeaveBalanceRepository : IAsyncRepository<LeaveBalance>
{
    Task<LeaveBalance?> GetBalanceByTypeAsync(string userName, int id);
    Task<THPResult> UpdateAvailableDaysAsync(int leaveTypeId, double totalDays, string userName);
}
