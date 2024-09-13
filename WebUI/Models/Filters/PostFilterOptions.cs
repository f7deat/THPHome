using ApplicationCore.Enums;

namespace ApplicationCore.Models.Filters;

public class PostFilterOptions : FilterOptions
{
    public PostType? Type { get; set; }
    public string? Title { get; set; }
    public PostStatus? Status { get; set; }
}
