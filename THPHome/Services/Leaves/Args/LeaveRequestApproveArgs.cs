using THPCore.Infrastructures;

namespace THPHome.Services.Leaves.Args;

public class LeaveRequestApproveArgs : BaseEntity
{
    public string? Comments { get; set; }
}
