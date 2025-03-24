using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Leaves;

public class LeaveType : BaseEntity<int>
{
    [StringLength(100)]
    public string Name { get; set; } = default!;
    [StringLength(255)]
    public string? Description { get; set; }
    public int MaxDays { get; set; }

    public ICollection<LeaveBalance>? LeaveBalances { get; set; }
    public ICollection<LeaveRequest>? LeaveRequests { get; set; }
}
