using THPHome.Entities.Leaves;

namespace THPHome.Models.Filters.Leaves;

public class LeaveRequestFilterOptions : FilterOptions
{
    public int? DepartmentId { get; set; }
    public int? LeaveTypeId { get; set; }
    public LeaveStatus? Status { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
}
