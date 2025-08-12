using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class Achievement : BaseEntity
{
    public string Name { get; set; } = default!;
    public DateTime? AchievementDate { get; set; }
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public int? Year { get; set; }
    [StringLength(2048)]
    public string? EvidenceUrl { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
