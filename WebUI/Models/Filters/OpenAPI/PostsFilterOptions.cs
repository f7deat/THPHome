using ApplicationCore.Enums;

namespace WebUI.Models.Filters.OpenAPI;

public class PostsFilterOptions
{
    public string? ApiKey { get; set; }
    public string? SearchTerm { get; set; }
    public int Current { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public PostType Type { get; set; } = PostType.NEWS;
    public Language Language { get; set; } = Language.VI;
    public int? CategoryId { get; set; }
}
