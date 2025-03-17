using THPCore.Infrastructures;

namespace THPHome.Models.Results.Curriculum;

public class AcademicProgramResult : BaseEntity<int>
{
    public string? Name { get; set; }
    public string? Code { get; set; }
    public int ViewCount { get; set; }
    public string? Description { get; set; }
    public string? Thumbnail { get; set; }
    public string Url { get; set; } = default!;
}
