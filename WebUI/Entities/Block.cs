using ApplicationCore.Entities;

namespace WebUI.Entities;

public class Block : BaseEntity<Guid>
{
    public string Name { get; set; } = default!;
    public string NormalizedName { get; set; } = default!;
    public bool Active { get; set; }
}
