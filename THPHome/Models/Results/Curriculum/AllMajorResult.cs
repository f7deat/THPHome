using THPCore.Infrastructures;

namespace THPHome.Models.Results.Curriculum;

public class AllMajorResult : BaseEntity<int>
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Thumbnail { get; set; }
    public List<AcademicProgramResult>? AcademicPrograms { get; set; }
}
