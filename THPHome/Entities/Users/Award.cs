using System.ComponentModel.DataAnnotations;

namespace THPHome.Entities.Users;

public class Award : THPIdentity.Entities.Award
{
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(2048)]
    public string? EvidenceUrl { get; set; }
}
