using ApplicationCore.Entities;

namespace THPHome.Entities.Curriculum;

/// <summary>
/// Lĩnh vực đào tạo
/// </summary>
public class FieldOfStudy : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;
    public int SortOrder { get; set; }
    public bool Active { get; set; }
}
