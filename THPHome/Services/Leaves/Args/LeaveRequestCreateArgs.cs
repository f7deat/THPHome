namespace THPHome.Services.Leaves.Args;

public class LeaveRequestCreateArgs
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int LeaveTypeId { get; set; }
    public string? Reason { get; set; }
    public long TotalDays { get; set; }
}
