using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class Achievement : BaseEntity
{
    public string Name { get; set; } = default!;
    public DateTime? AchievementDate { get; set; }
    public string UserName { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public int? Year { get; set; }
}
