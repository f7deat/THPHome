using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;
using THPCore.Interfaces;

namespace THPHome.Entities;

public class Localization : BaseEntity, ILocale
{
    public string Key { get; set; } = default!;
    public string? Value { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
    [StringLength(10)]
    public string Locale { get; set; } = "vi-VN";
}
