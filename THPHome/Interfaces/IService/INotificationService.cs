
using THPHome.Entities.Notifications;

namespace THPHome.Interfaces.IService;

public interface INotificationService
{
    Task<Notification?> GetAsync(Guid id);
}
