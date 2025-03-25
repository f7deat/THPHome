using THPCore.Models;
using THPHome.Models.Filters.Leaves;
using THPHome.Services.Leaves.Args;
using THPHome.Services.Leaves.Filters;

namespace THPHome.Interfaces.IService.ILeaves;

public interface ILeaveRequestService
{
    Task<THPResult> ApproveAsync(LeaveRequestApproveArgs args);
    Task<THPResult> CreateAsync(LeaveRequestCreateArgs args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<object?> GetChartAsync(LeaveRequestFilterOptions filterOptions);
    Task<object?> GetCountByDepartmentAsync();
    Task<object?> GetListAsync(LeaveRequestFilterOptions filterOptions);
    Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions);
    Task<THPResult> RejectAsync(LeaveRequestRejectArgs args);
    Task<THPResult> UpdateAsync(LeaveRequestUpdateArgs args);
}
