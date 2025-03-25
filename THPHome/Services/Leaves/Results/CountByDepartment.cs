namespace THPHome.Services.Leaves.Results;

public class CountByDepartment
{
    public int? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public int TotalPending { get; set; }
    public int TotalApproved { get; set; }
    public int TotalRejected { get; set; }
    public int Total { get; set; }
}
