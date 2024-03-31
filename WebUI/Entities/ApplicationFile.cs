using ApplicationCore.Entities;

namespace WebUI.Entities;

public class ApplicationFile : BaseEntity<Guid>
{
    public string Name { get; set; } = default!;
    public long Size { get; set; }
    public string ContentType { get; set; } = default!;
    public string Url { get; set; } = default!;
    public Guid? FolderId { get; set; }
}
