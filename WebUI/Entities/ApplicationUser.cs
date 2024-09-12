using Microsoft.AspNetCore.Identity;
using THPCore.Enums;

namespace WebUI.Entities;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }
    public string? Avatar { get; set; }
    public int? DepartmentId { get; set; }
    public UserType? UserType { get; set; }
    public string? Address { get; set; }
}
