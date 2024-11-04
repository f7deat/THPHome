namespace WebUI.Entities;

public class ApplicationLog
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = default!;
    public string Message { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
}
