using THPCore.Infrastructures;

namespace THPHome.Services.Leaves.Results;

public class LeaveUserListItem : BaseEntity
{
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public int Pending { get; set; }
    public int Approved { get; set; }
    public int Rejected { get; set; }
    public int Total { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public bool? Gender { get; set; }
}
