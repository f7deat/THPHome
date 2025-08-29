namespace THPHome.Models.Users.ForeignLanguage;

public class UploadEvidenceCeritficateArgs
{
    public IFormFile? File { get; set; }
    public Guid ForeignLanguageId { get; set; }
}
