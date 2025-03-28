using THPCore.Interfaces;
using THPHome.Entities.Notifications;

namespace THPHome.Interfaces.IRepository;

public interface INotificationRepository : IAsyncRepository<Notification>
{
    Task<int> GetUnreadCountAsync(string userName);
}
