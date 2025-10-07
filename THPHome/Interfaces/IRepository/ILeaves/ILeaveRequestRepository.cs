using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Leaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Models.Results.Charts;
using THPHome.Services.Leaves.Filters;
using THPHome.Services.Leaves.Results;
using THPIdentity.Entities;

namespace THPHome.Interfaces.IRepository.ILeaves;

public interface ILeaveRequestRepository : IAsyncRepository<LeaveRequest>
{
    Task<object?> GetCountByDepartmentAsync(DateTime fromDate, DateTime toDate);
    Task<object> GetListAsync(LeaveRequestFilterOptions filterOptions, ApplicationUser user);
    Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions, ApplicationUser user);
    Task<ColumnChart> CountAllByDepartmentAsync(DateTime fromDate, DateTime toDate);
    Task<ListResult<LeaveUserListItem>> ListUserAsync(LeaveUserFilterOptions filterOptions);
    Task<List<object>> GetChartAsync(LeaveRequestFilterOptions filterOptions);
}
