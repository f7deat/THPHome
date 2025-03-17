using ApplicationCore.Models.Filters;

namespace THPHome.Models.Filters.Users;

public class BookFilterOptions : FilterOptions
{
    public string? UserName { get; set; }
}
