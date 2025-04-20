using THPHome.Entities.Notifications;
using THPCore.Models;

namespace THPHome.Services.Notifications.Models;

public class NotificationFilterOptions : FilterOptions
{
    public NotificationType? Type { get; set; }
}
