namespace THPHome.Entities.Users;

public class EducationHistory : THPIdentity.Entities.EducationHistory
{
    public string UserName { get; set; } = default!;
    public string? EvidenceUrl { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
