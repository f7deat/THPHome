using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Models.ComponentModel;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Leaves;

public class LeaveTypeRepository(ApplicationDbContext context) : EfRepository<LeaveType>(context), ILeaveTypeRepository
{
    public async Task<IEnumerable<SelectOption>> GetOptionsAsync() => await _context.LeaveTypes.Select(x => new SelectOption
    {
        Value = x.Id,
        Label = x.Name
    }).ToListAsync();
}
