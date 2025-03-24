using THPCore.Interfaces;
using THPHome.Entities.Leaves;

namespace THPHome.Interfaces.IRepository.ILeaves;

public interface ILeaveBalanceRepository : IAsyncRepository<LeaveBalance>
{
    Task<LeaveBalance?> GetBalanceByTypeAsync(string userName, int id);
}
