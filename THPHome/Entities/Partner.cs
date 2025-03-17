using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities;

public class Partner : BaseEntity<int>
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Logo { get; set; }
    public ParnerStatus Status { get; set; }
    public string? Url { get; set; }
    public int Index { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
}

public enum ParnerStatus
{
    Draft,
    Active
}