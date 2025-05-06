using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Notifications;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Services.Notifications.Models;
using THPIdentity.Entities;

namespace THPHome.Services.Notifications;

public class NotificationService(INotificationRepository _notificationRepository, IHCAService _hcaService, ILogService _logService, UserManager<ApplicationUser> _userManager) : INotificationService
{
    public async Task<THPResult> CreatePrivateAsync(CreatePrivateArgs args)
    {
        try
        {
            if (!args.Recipients.Any()) return THPResult.Failed("No recipients found!");
            var userName = _hcaService.GetUserName();
            // DO NOT add the sender to the recipients
            args.Recipients = args.Recipients.Where(x => x != userName).Distinct();
            if (!args.Recipients.Any()) return THPResult.Failed("No recipients found!");
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
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }

    public async Task<THPResult> CreatePublicForStaffAsync(CreatePublicArgs args)
    {
        try
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Title = args.Title,
                Content = args.Content,
                Type = NotificationType.Private,
                CreatedBy = "tandc",
                CreatedDate = DateTime.Now
            };
            await _notificationRepository.AddAsync(notification);

            var recipients = await _userManager.Users.Where(x => x.UserType != UserType.Student && x.Status != UserStatus.Active).Select(x => x.UserName).ToListAsync();

            await _notificationRepository.SendToRecipientsAsync(notification.Id, recipients.Distinct());
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
