using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Leaves;

public class LeaveBalance : BaseEntity
{
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public double AvailableDays { get; set; }
    [ForeignKey(nameof(LeaveType))]
    public int LeaveTypeId { get; set; }
    public int Year { get; set; }

    public LeaveType? LeaveType { get; set; }
}
