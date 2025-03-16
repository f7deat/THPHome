using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class ResearchProject : BaseEntity
{
    public string UserName { get; set; } = default!;
    public string Name { get; set; } = default!;
    public int? StartYear { get; set; }
    public int? EndYear { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? Result { get; set; }
    public string? Role { get; set; }
    public string? Level { get; set; }
}
