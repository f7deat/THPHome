using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
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
        if (data != null) return new LeaveBalance { Id = data.Id, AvailableDays = data.AvailableDays, LeaveTypeId = data.LeaveTypeId, UserName = data.UserName, Year = data.Year };
        var leaveType = await _context.LeaveTypes.FindAsync(id);
        if (leaveType is null) return default;
        data = new LeaveBalance
        {
            UserName = userName,
            LeaveTypeId = id,
            Year = DateTime.Now.Year,
            AvailableDays = leaveType.MaxDays
        };
        await _context.LeaveBalances.AddAsync(data);
        await _context.SaveChangesAsync();
        return new LeaveBalance { Id = data.Id, AvailableDays = data.AvailableDays, LeaveTypeId = data.LeaveTypeId, UserName = data.UserName, Year = data.Year };
    }

    public async Task<THPResult> UpdateAvailableDaysAsync(int leaveTypeId, double totalDays, string userName)
    {
        var balance = await GetBalanceByTypeAsync(userName, leaveTypeId);
        if (balance == null) return THPResult.Failed("Không tìm thấy số ngày nghỉ phép!");
        if (balance.AvailableDays < totalDays) return THPResult.Failed("Số ngày nghỉ phép không đủ!");
        var data = await FindAsync(balance.Id);
        if (data is null) return THPResult.Failed("Không tìm thấy số ngày nghỉ phép!");
        data.AvailableDays -= totalDays;
        _context.Update(data);
        return THPResult.Success;
    }
}
