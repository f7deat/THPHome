using THPHome.Data;
using THPHome.Entities.Notifications;
using THPHome.Interfaces.IService;

namespace THPHome.Services;

public class NotificationService(ApplicationDbContext _context) : INotificationService
{
    public async Task<Notification?> GetAsync(Guid id) => await _context.Notifications.FindAsync(id);
}
