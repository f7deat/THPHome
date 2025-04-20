using THPCore.Models;

namespace THPHome.Models.Filters.Users;

public class UserInRoleFilterOptions : FilterOptions
{
    public string RoleName { get; set; } = default!;
    public string? UserName { get; set; }
}
