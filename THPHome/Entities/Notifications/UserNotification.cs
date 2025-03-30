using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Notifications;

public class UserNotification : BaseEntity
{
    [StringLength(256)]
    public string Recipient { get; set; } = default!;
    public bool IsRead { get; set; }
    [ForeignKey(nameof(Notification))]
    public Guid NotificationId { get; set; }
    public DateTime? ReadAt { get; set; }

    public Notification? Notification { get; set; }
}
