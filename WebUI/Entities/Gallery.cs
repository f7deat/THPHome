using ApplicationCore.Entities;

namespace WebUI.Entities;

public class Gallery : BaseEntity<Guid>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string NormalizedName { get; set; } = default!;

    public List<Photo>? Photos { get; set; }
}
