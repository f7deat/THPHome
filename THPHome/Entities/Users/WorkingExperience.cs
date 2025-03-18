using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class WorkingExperience : BaseEntity
{
    public string CompanyName { get; set; } = default!;
    public string Position { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
