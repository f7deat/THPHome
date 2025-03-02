using ApplicationCore.Models.Filters;
using THPHome.Enums;

namespace THPHome.Models.Filters.OpenAPI.Articles;

public class OpenArticleFilterOptions : FilterOptions
{
    public string? Title { get; set; }
    public PostType? Type { get; set; }
}
