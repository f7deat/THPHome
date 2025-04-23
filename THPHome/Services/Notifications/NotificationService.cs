using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Notifications;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Services.Notifications.Models;

namespace THPHome.Services.Notifications;

public class NotificationService(INotificationRepository _notificationRepository, IHCAService _hcaService) : INotificationService
{
    public async Task<THPResult> CreatePrivateAsync(CreatePrivateArgs args)
    {
        try
        {
            if (!args.Recipients.Any()) return THPResult.Failed("No recipients found!");
            var userName = _hcaService.GetUserName();
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Title = args.Title,
                Content = args.Content,
                Type = NotificationType.Private,
                CreatedBy = userName,
                CreatedDate = DateTime.Now
            };
            await _notificationRepository.AddAsync(notification);
            // DO NOT add the sender to the recipients
            args.Recipients = args.Recipients.Where(x => x != userName).Distinct();
            foreach (var item in args.Recipients)
            {
                if (item is null) continue;
                await _notificationRepository.AddUserNotificationAsync(item, notification.Id);
            }
            await _notificationRepository.SaveChangesAsync();
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            return THPResult.Failed(ex.ToString());
        }
    }

    public async Task<Notification?> GetAsync(Guid id)
    {
        var notification = await _notificationRepository.FindAsync(id);
        if (notification is null) return default;
        var userNotification = await _notificationRepository.GetUserNotificationAsync(id, _hcaService.GetUserName());
        if (userNotification != null)
        {
            userNotification.IsRead = true;
            userNotification.ReadAt = DateTime.Now;
            await _notificationRepository.SaveChangesAsync();
        }
        return new Notification
        {
            Id = notification.Id,
            Title = notification.Title,
            Content = notification.Content,
            Type = notification.Type,
            CreatedBy = notification.CreatedBy,
            CreatedDate = notification.CreatedDate,
            ModifiedBy = notification.ModifiedBy,
            ModifiedDate = notification.ModifiedDate
        };
    }

    public Task<int> GetUnreadCountAsync(string userName) => _notificationRepository.GetUnreadCountAsync(userName);
}
