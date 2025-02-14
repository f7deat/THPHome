using ApplicationCore.Models.Filters;

namespace THPHome.Models.Categories;

public class PostInCategoryFilterOptions : FilterOptions
{
    public int CategoryId { get; set; }
}
