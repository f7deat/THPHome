using THPCore.Infrastructures;

namespace THPHome.Entities.Curriculum;

/// <summary>
/// Chương trình đào tạo
/// </summary>
public class AcademicProgram : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public int TrainingGroupId { get; set; }
}
