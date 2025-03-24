using THPHome.Entities.Leaves;

namespace THPHome.Services.Leaves.Filters;

public class RequestCountFilterOptions
{
    public int? DepartmentId { get; set; }
    public string? UserName { get; set; }
    public LeaveStatus? Status { get; set; }
}
