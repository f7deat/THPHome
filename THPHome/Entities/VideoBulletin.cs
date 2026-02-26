using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities;

[Table("VideoBulletin")]
public class VideoBulletin : BaseEntity
{
    public int Volume { get; set; }
    public string? YoutubeId { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
}
