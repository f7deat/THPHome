using THPHome.Enums;
using THPHome.Models.Filters;

namespace THPHome.Models.Filters.OpenAPI;

public class PostsFilterOptions : FilterOptions
{
    public string? ApiKey { get; set; }
    public string? SearchTerm { get; set; }
    public PostType Type { get; set; } = PostType.NEWS;
    public int? CategoryId { get; set; }
}
