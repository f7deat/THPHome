using THPHome.Enums;
using THPHome.Models.Filters;

namespace THPHome.Models.Categories;

public class PostInCategoryFilterOptions : FilterOptions
{
    public int CategoryId { get; set; }
    public PostStatus? Status { get; set; }
}
