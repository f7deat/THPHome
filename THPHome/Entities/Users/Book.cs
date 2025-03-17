using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class Book : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? ISBN { get; set; }
    public string? Publisher { get; set; }
    public int PublishYear { get; set; }
}
