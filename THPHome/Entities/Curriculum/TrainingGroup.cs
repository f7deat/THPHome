using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Curriculum;

/// <summary>
/// Nhóm chương trình đào tạo
/// </summary>
public class TrainingGroup : BaseEntity<int>
{
    [StringLength(250)]
    public string Name { get; set; } = default!;
    [StringLength(2048)]
    public string? Thumbnail { get; set; }
    public string? Description { get; set; }
    public int SortOrder { get; set; }
    public bool Active { get; set; }
}
