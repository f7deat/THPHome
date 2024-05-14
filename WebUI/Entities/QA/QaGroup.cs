using ApplicationCore.Entities;
using ApplicationCore.Enums;

namespace WebUI.Entities;

public class QaGroup : BaseEntity<Guid>
{
    public string Title { get; set; } = default!;
    public int SortOrder { get; set; }
    public bool Active { get; set; }
    public Language Language { get; set; }

    public List<QaItem>? QaItems { get; set; }
}
