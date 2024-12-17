namespace THPHome.Models.Args.Notifications;

public class SendNotificationArgs
{
    public Guid NotificationId { get; set; }
    public SendNotificationTo SendTo { get; set; }
    public List<string>? Recipients { get; set; }
    public List<int>? ClassIds { get; set; }
}

public enum SendNotificationTo
{
    ALL,
    Class,
    Users
}
