namespace THPHome.Models.Users.Achievements;

public class UploadEvidenceArgs
{
    public IFormFile? File { get; set; }
    public Guid AchievementId { get; set; }
}
