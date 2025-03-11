using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class Country : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string Locale { get; set; } = default!;
}
