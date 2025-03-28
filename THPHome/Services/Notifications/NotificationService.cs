using THPHome.Entities.Notifications;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;

namespace THPHome.Services.Notifications;

public class NotificationService(INotificationRepository _notificationRepository) : INotificationService
{
    public Task<Notification?> GetAsync(Guid id) => _notificationRepository.FindAsync(id);

    public Task<int> GetUnreadCountAsync(string userName) => _notificationRepository.GetUnreadCountAsync(userName);
}
