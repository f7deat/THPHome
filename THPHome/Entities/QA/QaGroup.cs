using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;
using THPCore.Interfaces;

namespace THPHome.Entities.QA;

public class QaGroup : BaseEntity, ILocale
{
    public string Title { get; set; } = default!;
    public int SortOrder { get; set; }
    public bool Active { get; set; }
    [StringLength(10)]
    public string Locale { get; set; } = "vi-VN";
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }

    public ICollection<QaItem>? QaItems { get; set; }
}
