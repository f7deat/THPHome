using THPCore.Infrastructures;

namespace THPHome.Services.Leaves.Args;

public class LeaveRequestRejectArgs : BaseEntity
{
    public string? Comments { get; set; }
}
