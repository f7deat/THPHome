using THPCore.Interfaces;
using THPHome.Entities.Leaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Services.Leaves.Filters;
using THPHome.Services.Leaves.Results;
using THPIdentity.Entities;

namespace THPHome.Interfaces.IRepository.ILeaves;

public interface ILeaveRequestRepository : IAsyncRepository<LeaveRequest>
{
    Task<object?> GetCountByDepartmentAsync();
    Task<object> GetListAsync(LeaveRequestFilterOptions filterOptions, ApplicationUser user);
    Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions, ApplicationUser user);
    Task<List<CountByDepartment>> CountAllByDepartmentAsync(DateTime? fromDate, DateTime? toDate);
}
