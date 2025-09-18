namespace THPHome.Models.Users.Book;

public class BookUploadEvidenceArgs
{
    public IFormFile? File { get; set; }
    public Guid BookId { get; set; }
}
