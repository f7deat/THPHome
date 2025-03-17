using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities;

public class Photo : BaseEntity
{
    public string? Description { get; set; }
    public string Url { get; set; } = default!;

    [ForeignKey(nameof(File))]
    public Guid? FileId { get; set; }

    [ForeignKey(nameof(Gallery))]
    public Guid? GalleryId { get; set; }
    [ForeignKey(nameof(Post))]
    public long? PostId { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }

    public Gallery? Gallery { get; set; }
    public ApplicationFile? File { get; set; }
    public Post? Post { get; set; }
}
