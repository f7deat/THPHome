using THPCore.Infrastructures;

namespace THPHome.Entities.Curriculum;

/// <summary>
/// Chương trình đào tạo
/// </summary>
public class AcademicProgram : BaseEntity<int>
{
    public string Code { get; set; } = default!;
    public string? Description { get; set; }
    public int? MajorId { get; set; }
    public int SortOrder { get; set; }
    public long PostId { get; set; }

    public Major? Major { get; set; }
}
