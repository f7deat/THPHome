using ApplicationCore.Entities;

namespace WebUI.Entities;

public class ApplicationFolder : BaseEntity<Guid>
{
    public string Name { get; set; } = default!;
    public Guid? ParentId { get; set; }
}
