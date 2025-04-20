using THPCore.Models;

namespace THPHome.Services.Leaves.Filters;

public class LeaveUserFilterOptions : FilterOptions
{
    public int? DepartmentId { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
}
