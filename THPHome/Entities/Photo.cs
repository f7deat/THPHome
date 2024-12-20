using ApplicationCore.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using THPHome.Entities;

namespace WebUI.Entities;

public class Photo : BaseEntity<Guid>
{
    public string? Description { get; set; }
    public string Url { get; set; } = default!;

    [ForeignKey(nameof(File))]
    public Guid? FileId { get; set; }

    [ForeignKey(nameof(Gallery))]
    public Guid? GalleryId { get; set; }
    [ForeignKey(nameof(Post))]
    public long? PostId { get; set; }

    public Gallery? Gallery { get; set; }
    public ApplicationFile? File { get; set; }
    public Post? Post { get; set; }
}
