using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities.Notifications;

public class Notification : BaseEntity
{
    [StringLength(512)]
    public string Title { get; set; } = default!;
    public string? Content { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(256)]
    public string CreatedBy { get; set; } = default!;
    [StringLength(256)]
    public string? ModifiedBy { get; set; }

    public List<UserNotification>? UserNofifications { get; set; }
}
