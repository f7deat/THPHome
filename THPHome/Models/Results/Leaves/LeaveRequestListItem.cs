using THPCore.Infrastructures;
using THPHome.Entities.Leaves;

namespace THPHome.Models.Results.Leaves;

public class LeaveRequestListItem : BaseEntity
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public long TotalDays { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? Reason { get; set; }
    public LeaveStatus Status { get; set; }
    public bool? Gender { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public int LeaveTypeId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? ApprovedBy { get; set; }
    public string? Comments { get; set; }
}
