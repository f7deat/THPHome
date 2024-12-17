using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities.Notifications;
using THPHome.Models.Args.Notifications;
using THPIdentity.Constants;
using WebUI.Foundations;

namespace THPHome.Controllers;

public class NotificationController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _context.Notifications
                    select new
                    {
                        a.Id,
                        a.CreatedDate,
                        a.ModifiedDate,
                        a.CreatedBy,
                        a.ModifiedBy,
                        a.Content,
                        a.Title,
                        sentCount = _context.UserNotifications.Count(x => x.NotificationId == a.Id),
                        readCount = _context.UserNotifications.Count(x => x.NotificationId == a.Id && x.IsRead)
                    };
        return Ok(new
        {
            data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync(),
            total = await query.CountAsync()
        });
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Notification args)
    {
        if (!User.IsInRole(RoleName.ADMIN)) return Unauthorized();
        args.CreatedDate = DateTime.Now;
        args.CreatedBy = User.GetUserName();
        await _context.Notifications.AddAsync(args);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendAsync([FromBody] SendNotificationArgs args)
    {
        if (!User.IsInRole(RoleName.ADMIN)) return Unauthorized();
        var noti = await _context.Notifications.FindAsync(args.NotificationId);
        if (noti is null) return BadRequest("Không tìm thấy thông báo!");
        switch (args.SendTo)
        {
            case SendNotificationTo.ALL:
                break;
            case SendNotificationTo.Class:
                break;
            case SendNotificationTo.Recipients:
                if (args.Recipients is null) return BadRequest("Vui lòng chọn người nhận!");
                foreach (var recipient in args.Recipients)
                {
                    await _context.UserNotifications.AddAsync(new UserNotification
                    {
                        NotificationId = args.NotificationId,
                        Recipient = recipient,
                        IsRead = false
                    });
                }
                break;
            default:
                break;
        }
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Notification args)
    {
        if (!User.IsInRole(RoleName.ADMIN)) return Unauthorized();
        var noti = await _context.Notifications.FindAsync(args.Id);
        if (noti is null) return BadRequest("Notification not found!");
        noti.ModifiedDate = DateTime.Now;
        noti.ModifiedBy = User.GetUserName();
        noti.Title = args.Title;
        noti.Content = args.Content;
        _context.Notifications.Update(noti);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        if (!User.IsInRole(RoleName.ADMIN)) return Unauthorized();
        var noti = await _context.Notifications.FindAsync(id);
        if (noti is null) return BadRequest("Notification not found!");
        var userNotifications = await _context.UserNotifications.Where(x => x.NotificationId == id).ToListAsync();
        if (userNotifications.Count != 0)
        {
            _context.UserNotifications.RemoveRange(userNotifications);
        }
        _context.Remove(noti);
        await _context.SaveChangesAsync();
        return Ok(THPResult.Success);
    }

    [HttpPost("read/{id}")]
    public async Task<IActionResult> ReadAsync([FromRoute] Guid id)
    {
        var userNotification = await _context.UserNotifications.FindAsync(id);
        if (userNotification is null) return BadRequest("Notification not found!");
        if (User.GetUserName() != userNotification.Recipient) return BadRequest("Can not read other user notification!");
        userNotification.IsRead = true;
        _context.UserNotifications.Update(userNotification);
        await _context.SaveChangesAsync();
        return Ok(THPResult.Success);
    }
}
