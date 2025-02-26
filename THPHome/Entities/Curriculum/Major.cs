using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Curriculum;

public class Major : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string Code { get; set; } = default!;
    public string? Description { get; set; }
    [StringLength(2048)]
    public string? Thumbnail { get; set; }
    public bool Active { get; set; }
    public int SortOrder { get; set; }
    [ForeignKey(nameof(Post))]
    public long? PostId { get; set; }
    [ForeignKey(nameof(TrainingGroup))]
    public int? TrainingGroupId { get; set; }
    [ForeignKey(nameof(FieldOfStudy))]
    public int? FieldOfStudyId { get; set; }

    public Post? Post { get; set; }
    public TrainingGroup? TrainingGroup { get; set; }
    public FieldOfStudy? FieldOfStudy { get; set; }
}
