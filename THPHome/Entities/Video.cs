using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;
using THPCore.Interfaces;

namespace THPHome.Entities;

public class Video : BaseEntity<long>, ILocale
{
    [StringLength(250)]
    public string? Name { get; set; }
    [StringLength(500)]
    public string? Url { get; set; }
    [StringLength(500)]
    public string? Thumbnail { get; set; }
    public DateTime CreatedDate { get; set; }
    [StringLength(10)]
    public string Locale { get; set; } = "vi-VN";
}
