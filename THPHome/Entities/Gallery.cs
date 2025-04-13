using THPCore.Infrastructures;

namespace THPHome.Entities;

public class Gallery : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string NormalizedName { get; set; } = default!;

    public ICollection<Photo>? Photos { get; set; }
}
