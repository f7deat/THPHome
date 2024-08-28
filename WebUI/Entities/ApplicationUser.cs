using Microsoft.AspNetCore.Identity;

namespace ApplicationCore.Entities;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }
    public string? Avatar { get; set; }
    public int? DepartmentId { get; set; }
    public int? UserType { get; set; }
    public string? Address { get; set; }
}
