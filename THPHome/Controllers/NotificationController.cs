using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Entities.Notifications;
using THPHome.Models.Args.Notifications;
using WebUI.Foundations;

namespace THPHome.Controllers;

public class NotificationController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _context.Notifications
                    select a;
        return Ok(new
        {
            data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync(),
            total = await query.CountAsync()
        });
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Notification args)
    {
        await _context.Notifications.AddAsync(args);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendAsync([FromBody] SendNotificationArgs args)
    {
        var noti = await _context.Notifications.FindAsync(args.NotificationId);
        if (noti is null) return BadRequest("Không tìm thấy thông báo!");
        switch (args.SendTo)
        {
            case SendNotificationTo.ALL:
                break;
            case SendNotificationTo.Class:
                break;
            case SendNotificationTo.Users:
                if (args.Users is null) return BadRequest("Vui lòng chọn người nhận!");

                break;
            default:
                break;
        }
        return Ok(IdentityResult.Success);
    }
}
