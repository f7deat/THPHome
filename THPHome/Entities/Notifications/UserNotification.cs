using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Notifications;

public class UserNotification : BaseEntity
{
    [StringLength(256)]
    public string Recipient { get; set; } = default!;
    public bool IsRead { get; set; }
    public Guid NotificationId { get; set; }

    public Notification? Notification { get; set; }
}
