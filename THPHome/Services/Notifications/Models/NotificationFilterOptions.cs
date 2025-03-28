using THPHome.Entities.Notifications;
using THPHome.Models.Filters;

namespace THPHome.Services.Notifications.Models;

public class NotificationFilterOptions : FilterOptions
{
    public NotificationType? Type { get; set; }
}
