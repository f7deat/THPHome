using ApplicationCore.Entities;
using ApplicationCore.Enums;
using System.ComponentModel.DataAnnotations;
using WebUI.Entities;

namespace THPHome.Entities;

public class Post : BaseEntity<long>
{
    [StringLength(500)]
    public string Title { get; set; } = default!;
    [StringLength(500)]
    public string Url { get; set; } = default!;
    [StringLength(500)]
    public string? Description { get; set; }
    public string? Content { get; set; }
    [StringLength(500)]
    public string? Thumbnail { get; set; }
    public int View { get; set; }
    public PostStatus Status { get; set; }
    public PostType Type { get; set; }
    public string? Tags { get; set; }
    public Language Language { get; set; }
    public DateTime IssuedDate { get; set; }

    public List<Photo>? Photos { get; set; }
}
