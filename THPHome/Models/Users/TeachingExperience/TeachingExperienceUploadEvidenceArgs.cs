namespace THPHome.Models.Users.TeachingExperience;

public class TeachingExperienceUploadEvidenceArgs
{
    public IFormFile? File { get; set; }
    public Guid TeachingExperienceId { get; set; }
}
