using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Utils;

public class UrlShortener : BaseEntity
{
    [StringLength(2048)]
    public string OriginalUrl { get; set; } = default!;
    [StringLength(2048)]
    public string ShortenedUrl { get; set; } = default!;
    [StringLength(100)]
    public string? UTM { get; set; }
    public DateTime CreatedDate { get; set; }
    [StringLength(256)]
    public string CreatedBy { get; set; } = default!;
    public int ViewCount { get; set; }
    public DateTime? LastVisitedDate { get; set; }
}
