using THPCore.Infrastructures;

namespace THPHome.Models.Results.QAs;

public class QaItemListResult : BaseEntity
{
    public string? Question { get; set; }
    public string? Answer { get; set; }
    public int SortOrder { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
