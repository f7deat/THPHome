using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities;

public class ApplicationFile : BaseEntity
{
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
    public string Name { get; set; } = default!;
    public long Size { get; set; }
    public string ContentType { get; set; } = default!;
    public string Url { get; set; } = default!;

    [ForeignKey(nameof(Folder))]
    public Guid? FolderId { get; set; }

    public ApplicationFolder? Folder { get; set; }
}
