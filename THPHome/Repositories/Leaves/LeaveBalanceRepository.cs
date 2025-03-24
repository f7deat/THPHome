using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Leaves;

public class LeaveBalanceRepository(ApplicationDbContext context) : EfRepository<LeaveBalance>(context), ILeaveBalanceRepository
{
    public async Task<LeaveBalance?> GetBalanceByTypeAsync(string userName, int id)
    {
        var data = await _context.LeaveBalances.FirstOrDefaultAsync(x => x.UserName == userName && x.LeaveTypeId == id && x.Year == DateTime.Now.Year);
        if (data != null) return data;
        var leaveType = await _context.LeaveTypes.FindAsync(id);
        if (leaveType == null) return default;
        data = new LeaveBalance
        {
            UserName = userName,
            LeaveTypeId = id,
            Year = DateTime.Now.Year,
            AvailableDays = leaveType.MaxDays
        };
        await _context.LeaveBalances.AddAsync(data);
        await _context.SaveChangesAsync();
        return data;
    }
}
