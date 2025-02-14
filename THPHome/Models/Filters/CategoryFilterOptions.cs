using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters;

public class CategoryFilterOptions : FilterOptions
{
    public string? Name { get; set; }
}

public class CategorySelectFilterOptions : FilterOptions
{
}
