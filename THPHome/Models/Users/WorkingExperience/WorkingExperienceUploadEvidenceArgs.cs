namespace THPHome.Models.Users.WorkingExperience;

public class WorkingExperienceUploadEvidenceArgs
{
    public IFormFile? File { get; set; }
    public Guid WorkingExperienceId { get; set; }
}
