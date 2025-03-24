using THPCore.Interfaces;
using THPHome.Entities.Leaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Services.Leaves.Filters;
using THPIdentity.Entities;

namespace THPHome.Interfaces.IRepository.ILeaves;

public interface ILeaveRequestRepository : IAsyncRepository<LeaveRequest>
{
    Task<object?> GetCountByDepartmentAsync();
    Task<object> GetListAsync(LeaveRequestFilterOptions filterOptions, ApplicationUser user);
    Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions, ApplicationUser user);
}
