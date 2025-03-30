namespace THPHome.Services.Notifications.Models;

public class CreatePrivateArgs
{
    public string Title { get; set; } = default!;
    public string Content { get; set; } = default!;
    public IEnumerable<string?> Recipients { get; set; } = default!;
}
