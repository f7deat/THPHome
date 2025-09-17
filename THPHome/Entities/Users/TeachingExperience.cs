using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class TeachingExperience : BaseEntity
{
    public string CourseCode { get; set; } = default!;
    public string CourseName { get; set; } = default!;
    public string? Description { get; set; }
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public string? EvidenceUrl { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Level { get; set; }
}
