using ApplicationCore.Models.Filters;

namespace THPHome.Models.Filters.Leaves;

public class LeaveRequestFilterOptions : FilterOptions
{
    public int? DepartmentId { get; set; }
}
