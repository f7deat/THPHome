namespace THPHome.Services.Notifications.Models;

public class CreatePublicArgs
{
    public string Title { get; set; } = default!;
    public string Content { get; set; } = default!;
    public string APIKey { get; set; } = default!;
}
