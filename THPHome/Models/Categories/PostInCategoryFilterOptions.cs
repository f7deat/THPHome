using ApplicationCore.Models.Filters;

namespace WebUI.Models.Categories;

public class PostInCategoryFilterOptions : FilterOptions
{
    public int CategoryId { get; set; }
}
