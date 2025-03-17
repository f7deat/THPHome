using ApplicationCore.Enums;
using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities;

public class Localization : BaseEntity
{
    public Language Language { get; set; }
    public string Key { get; set; } = default!;
    public string? Value { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
}
