namespace WebUI.Entities.Communications;

public class EmailLog
{
    public Guid Id { get; set; }
    public DateTime SendDate { get; set; }
    public string Subject { get; set; } = default!;
    public string Body { get; set; } = default!;
    public int OpenNumber { get; set; }
    public DateTime? OpenDate { get; set; }
    public string RecipientEmail { get; set; } = default!;
    public EmailStatus Status { get; set; }
    public string? Note { get; set; }
}

public enum EmailStatus
{
    Successful,
    Failed
}
