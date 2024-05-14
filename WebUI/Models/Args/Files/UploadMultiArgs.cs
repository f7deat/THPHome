namespace WebUI.Models.Args.Files;

public class UploadMultiArgs
{
    public Guid? FolderId { get; set; }
    public List<IFormFile>? Files { get; set; }
}
