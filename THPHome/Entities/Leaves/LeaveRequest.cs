using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Leaves;

public class LeaveRequest : BaseEntity
{
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    [ForeignKey(nameof(LeaveType))]
    public int LeaveTypeId { get; set; }
    public DateTime StartDate { get; set; }
    public double TotalDays { get; set; }
    [StringLength(255)]
    public string? Reason { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public LeaveStatus Status { get; set; }
    [StringLength(256)]
    public string? ApprovedBy { get; set; }
    public DateTime? ApprovedAt { get; set; }
    [StringLength(255)]
    public string? Comments { get; set; }
    public int DepartmentId { get; set; }

    public LeaveType? LeaveType { get; set; }
}

public enum LeaveStatus
{
    Pending = 0,
    Approved = 1,
    Rejected = 2
}