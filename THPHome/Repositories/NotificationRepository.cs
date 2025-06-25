using Microsoft.EntityFrameworkCore;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities.Notifications;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class NotificationRepository(ApplicationDbContext context) : EfRepository<Notification>(context), INotificationRepository
{
    public async Task AddUserNotificationAsync(string recipient, Guid notificationId)
    {
        await _context.UserNotifications.AddAsync(new UserNotification
        {
            NotificationId = notificationId,
            Recipient = recipient
        });
    }

    public async Task<int> GetUnreadCountAsync(string userName) => await _context.UserNotifications.CountAsync(x => x.Recipient == userName && !x.IsRead);

    public async Task<UserNotification?> GetUserNotificationAsync(Guid notificationId, string userName) => await _context.UserNotifications.FirstOrDefaultAsync(x => x.NotificationId == notificationId && x.Recipient == userName);

    public async Task<THPResult> MarkAsUnreadAsync(Guid id)
    {
        var userNotification = await _context.UserNotifications.FindAsync(id);
        if (userNotification is null) return THPResult.Failed("Notification not found!");
        userNotification.IsRead = false;
        _context.UserNotifications.Update(userNotification);
        await _context.SaveChangesAsync();
        return THPResult.Success;
    }

    public async Task SendToRecipientsAsync(Guid id, IEnumerable<string?> recipients)
    {
        var userNotifications = new List<UserNotification>();
        foreach (var item in recipients)
        {
            if (string.IsNullOrEmpty(item)) continue;
            userNotifications.Add(new()
            {
                NotificationId = id,
                Recipient = item
            });
        }
        await _context.UserNotifications.AddRangeAsync(userNotifications);
        await _context.SaveChangesAsync();
    }
}
