using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Notifications;

namespace THPHome.Interfaces.IRepository;

public interface INotificationRepository : IAsyncRepository<Notification>
{
    Task AddUserNotificationAsync(string recipient, Guid notificationId);
    Task<int> GetUnreadCountAsync(string userName);
    Task<UserNotification?> GetUserNotificationAsync(Guid notificationId, string userName);
    Task<THPResult> MarkAsUnreadAsync(Guid id);
    Task SendToRecipientsAsync(Guid id, IEnumerable<string?> recipients);
}
