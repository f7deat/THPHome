namespace THPHome.Models.Users.Journal;
public class JournalUploadEvidenceArgs
{
    public IFormFile? File { get; set; }
    public Guid JournalId { get; set; }
}
