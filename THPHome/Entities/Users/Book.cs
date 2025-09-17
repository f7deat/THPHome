using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class Book : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? Cover { get; set; }
    public string? ISBN { get; set; }
    public string? Publisher { get; set; }
    public int PublishYear { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? Authors { get; set; }
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public string? EvidenceUrl { get; set; }
}
