using ApplicationCore.Models.Filters;
using THPHome.Enums;

namespace THPHome.Models.Categories;

public class PostInCategoryFilterOptions : FilterOptions
{
    public int CategoryId { get; set; }
    public PostStatus? Status { get; set; }
}
