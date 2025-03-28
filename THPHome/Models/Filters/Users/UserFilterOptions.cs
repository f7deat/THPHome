using THPIdentity.Entities;

namespace THPHome.Models.Filters.Users;

public class UserFilterOptions : FilterOptions
{
    public string? Name { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public UserType? UserType { get; set; }
    public int? DepartmentCode { get; set; }
}
