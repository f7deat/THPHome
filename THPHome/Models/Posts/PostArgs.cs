using ApplicationCore.Entities;
using ApplicationCore.Enums;
using System.ComponentModel.DataAnnotations;
using WebUI.Helpers;

namespace WebUI.Models.Posts;

public class PostArgs : BaseEntity<long>
{
    public string? Locale { get; set; }
    public string? Title { get; set; }
    [StringLength(500), Required]
    public string Url { get; set; } = default!;
    public string? Description { get; set; }
    public string? Content { get; set; }
    public string? Thumbnail { get; set; }
    public int View { get; set; }
    public PostStatus Status { get; set; }
    public PostType Type { get; set; }
    public string? Tags { get; set; }
    public Language Language => LanguageHelper.GetLanguage(Locale);
}
