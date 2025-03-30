using THPCore.Interfaces;
using THPHome.Entities.Notifications;

namespace THPHome.Interfaces.IRepository;

public interface INotificationRepository : IAsyncRepository<Notification>
{
    Task AddUserNotificationAsync(string recipient, Guid notificationId);
    Task<int> GetUnreadCountAsync(string userName);
    Task<UserNotification?> GetUserNotificationAsync(Guid notificationId, string userName);
}
