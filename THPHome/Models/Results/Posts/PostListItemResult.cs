using ApplicationCore.Enums;

namespace WebUI.Models.Results.Posts;

public class PostListItemResult
{
    public long Id { get; set; }
    public string Url { get; set; } = default!;
    public DateTime? ModifiedDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public int View { get; set; }
    public string Title { get; set; } = default!;
    public PostStatus Status { get; set; }
    public bool CanUpdate { get; set; }
    public string? Thumbnail { get; set; }
    public DateTime IssuedDate { get; set; }
    public int? CategoryId { get; set; }
}
