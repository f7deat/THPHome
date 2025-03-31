using THPIdentity.Entities;

namespace THPHome.Services.Users.Models;

public class StaffListItem
{
    public string Id { get; set; } = default!;
    public string? UserName { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public int? DepartmentId { get; set; }
    public bool? Gender { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Avatar { get; set; }
    public UserStatus Status { get; set; }
}
