using ApplicationCore.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using WebUI.Entities;

namespace THPHome.Entities.QA;

public class QaItem : BaseEntity<Guid>
{
    [ForeignKey(nameof(QaGroup))]
    public Guid QaGroupId { get; set; }
    public string Question { get; set; } = default!;
    public string Answer { get; set; } = default!;
    public int SortOrder { get; set; }

    public QaGroup? QaGroup { get; set; }
}
