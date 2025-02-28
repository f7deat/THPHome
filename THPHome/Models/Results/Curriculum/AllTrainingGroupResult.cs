using THPCore.Infrastructures;
using THPHome.Entities.Curriculum;

namespace THPHome.Models.Results.Curriculum;

public class AllTrainingGroupResult : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string? Thumbnail { get; set; }

    public List<Major>? Majors { get; set; }
}