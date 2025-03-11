using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

/// <summary>
/// Học Vị
/// </summary>
public class AcademicDegree : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    public string ShortName { get; set; } = default!;

    public ICollection<UserDetail>? UserDetails { get; set; }
}
