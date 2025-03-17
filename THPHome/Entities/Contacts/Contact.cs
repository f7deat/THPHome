using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Contacts;

public class Contact : BaseEntity
{
    public string FullName { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? School { get; set; }
    public string? Note { get; set; }
    [ForeignKey(nameof(ContactStatus))]
    public int ContactStatusId { get; set; }
    public string? UserName { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public ContactSource Source { get; set; }
    public string? HollandChoice { get; set; }
    public string? HollandResult { get; set; }

    public ContactStatus? ContactStatus { get; set; }
}

public enum ContactSource
{
    Website,
    Opportunity
}
