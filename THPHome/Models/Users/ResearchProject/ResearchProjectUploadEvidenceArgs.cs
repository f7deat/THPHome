namespace THPHome.Models.Users.ResearchProject;

public class ResearchProjectUploadEvidenceArgs
{
    public IFormFile? File { get; set; }
    public Guid ResearchProjectId { get; set; }
}