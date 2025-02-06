using THPCore.Infrastructures;

namespace THPHome.Entities;

public class Contact : BaseEntity
{
    public string FullName { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? School { get; set; }
    public string? Note { get; set; }
    public ContactStatus Status { get; set; }
    public string? UserName { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}

public enum ContactStatus
{
    Pending,
    Processing,
    Completed,
    Rejected
}
