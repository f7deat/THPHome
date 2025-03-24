namespace THPHome.Services.Leaves.Args;

public class LeaveRequestCreateArgs
{
    public DateTime StartDate { get; set; }
    public int LeaveTypeId { get; set; }
    public string? Reason { get; set; }
    public double TotalDays { get; set; }
}
