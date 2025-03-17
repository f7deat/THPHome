using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.QA;

public class QaItem : BaseEntity
{
    [ForeignKey(nameof(QaGroup))]
    public Guid QaGroupId { get; set; }
    public string Question { get; set; } = default!;
    public string Answer { get; set; } = default!;
    public int SortOrder { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }

    public QaGroup? QaGroup { get; set; }
}
