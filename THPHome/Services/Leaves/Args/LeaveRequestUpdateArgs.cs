using THPCore.Infrastructures;

namespace THPHome.Services.Leaves.Args;

public class LeaveRequestUpdateArgs : BaseEntity
{
    public DateTime StartDate { get; set; }
    public long TotalDays { get; set; }
    public int LeaveTypeId { get; set; }
    public string? Reason { get; set; }
}
