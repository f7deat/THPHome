namespace THPHome.Models.Users.Awards;

public class AwardEvidenceUploadArgs
{
    public Guid Id { get; set; }
    public IFormFile? File { get; set; }
}
