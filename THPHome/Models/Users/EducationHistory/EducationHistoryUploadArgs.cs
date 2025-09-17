namespace THPHome.Models.Users.EducationHistory;
public class EducationHistoryUploadArgs
{
    public IFormFile? File { get; set; }
    public Guid EducationHistoryId { get; set; }
}