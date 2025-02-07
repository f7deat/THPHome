using ApplicationCore.Models.Filters;

namespace THPHome.Models.Filters.Articles;

public class ArticleFilterOptions : FilterOptions
{
    public int? CategoryId { get; set; }
}
