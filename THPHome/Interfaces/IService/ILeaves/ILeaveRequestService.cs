using THPCore.Models;
using THPHome.Models.Filters.Leaves;
using THPHome.Models.Results.Charts;
using THPHome.Services.Leaves.Args;
using THPHome.Services.Leaves.Filters;
using THPHome.Services.Leaves.Results;

namespace THPHome.Interfaces.IService.ILeaves;

public interface ILeaveRequestService
{
    Task<THPResult> ApproveAsync(LeaveRequestApproveArgs args);
    Task<THPResult> CreateAsync(LeaveRequestCreateArgs args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<ColumnChart> GetChartAsync(LeaveRequestFilterOptions filterOptions);
    Task<object?> GetCountByDepartmentAsync(LeaveRequestFilterOptions filterOptions);
    Task<object?> GetListAsync(LeaveRequestFilterOptions filterOptions);
    Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions);
    Task<ListResult<LeaveUserListItem>> ListUserAsync(LeaveUserFilterOptions filterOptions);
    Task<THPResult> RejectAsync(LeaveRequestRejectArgs args);
    Task<THPResult> UpdateAsync(LeaveRequestUpdateArgs args);
}
