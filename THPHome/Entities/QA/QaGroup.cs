using ApplicationCore.Enums;
using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.QA;

public class QaGroup : BaseEntity
{
    public string Title { get; set; } = default!;
    public int SortOrder { get; set; }
    public bool Active { get; set; }
    public Language Language { get; set; }

    public List<QaItem>? QaItems { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
}
