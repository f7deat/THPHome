using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

/// <summary>
/// Học Hàm
/// </summary>
public class AcademicTitle : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string ShortName { get; set; } = default!;

    public ICollection<UserDetail>? UserDetails { get; set; }
}
