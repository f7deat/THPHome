using THPCore.Infrastructures;

namespace THPHome.Entities.Contacts;

public class ContactStatus : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? ModifiedBy { get; set; }

    public ICollection<Contact>? Contacts { get; set; }
}
