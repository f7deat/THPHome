using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Notifications;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class NotificationRepository(ApplicationDbContext context) : EfRepository<Notification>(context), INotificationRepository
{
    public async Task<int> GetUnreadCountAsync(string userName) => await _context.UserNotifications.CountAsync(x => x.Recipient == userName && !x.IsRead);
}
