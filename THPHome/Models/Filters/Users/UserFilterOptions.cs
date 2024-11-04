using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.Users;

public class UserFilterOptions : FilterOptions
{
    public string? Name { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
}
