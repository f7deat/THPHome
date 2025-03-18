using Microsoft.EntityFrameworkCore;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class Journal : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? ISSN { get; set; }
    public int? AuthorCount { get; set; }
    [Comment("The year of the journal - Tập")]
    public string? Volume { get; set; }
    [Comment("The issue of the journal - Số")]
    public string? Issue { get; set; }
    public string? Page { get; set; }
    public int? PublishYear { get; set; }
    public string UserName { get; set; } = default!;
}
