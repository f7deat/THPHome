using System.ComponentModel.DataAnnotations;

namespace THPHome.Entities.Users;

public class ForeignLanguageProficiency : THPIdentity.Entities.ForeignLanguageProficiency
{
    public string UserName { get; set; } = default!;
    [StringLength(2048)]
    public string? EvidenceUrl { get; set; }
    public DateTime CreatedDate { get; set; }
}
