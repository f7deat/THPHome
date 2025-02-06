using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Helpers.Validators;
using THPHome.Models.Filters.Contacts;
using THPIdentity.Constants;
using WebUI.Foundations;
using WebUI.Interfaces.IService;

namespace THPHome.Controllers;

public class ContactController(ApplicationDbContext context, ITelegramService _telegramService) : BaseController(context)
{
    [HttpPost("get-quote"), AllowAnonymous]
    public async Task<IActionResult> GetQuoteAsync([FromBody] Contact args)
    {
        if (string.IsNullOrWhiteSpace(args.FullName)) return BadRequest("Vui lòng nhập họ và tên!");
        if (!PhoneNumberValidator.ValidateVietnamPhoneNumber(args.PhoneNumber)) return BadRequest("Số điện thoại không hợp lệ!");
        if (await _context.Contacts.AnyAsync(x => x.PhoneNumber == args.PhoneNumber)) return BadRequest("Số điện thoại đã tồn tại!");
        args.CreatedDate = DateTime.Now;
        await _context.Contacts.AddAsync(args);

        _ = _telegramService.SendMessageAsync($"Có liên hệ mới {args.FullName} - {args.PhoneNumber}!");

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] ContactFilterOptions filterOptions)
    {
        var query = from a in _context.Contacts
                    select a;
        if (!string.IsNullOrWhiteSpace(filterOptions.FullName))
        {
            query = query.Where(x => x.FullName.ToLower().Contains(filterOptions.FullName.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.PhoneNumber))
        {
            query = query.Where(x => x.PhoneNumber != null && x.PhoneNumber.ToLower().Contains(filterOptions.PhoneNumber.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.Email))
        {
            query = query.Where(x => x.Email != null && x.Email.ToLower().Contains(filterOptions.Email.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.School))
        {
            query = query.Where(x => x.School != null && x.School.ToLower().Contains(filterOptions.School.ToLower()));
        }
        return Ok(new
        {
            data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync(),
            total = await query.CountAsync()
        });
    }

    [HttpPost("update-status")]
    public async Task<IActionResult> UpdateStatusAsync([FromBody] Contact args)
    {
        var contact = await _context.Contacts.FindAsync(args.Id);
        if (contact is null) return BadRequest("Không tìm thấy liên hệ!");
        if (!string.IsNullOrEmpty(contact.UserName))
        {
            if (contact.UserName != User.GetUserName()) return BadRequest("Không thể cập nhật trạng thái của liên hệ người khác đang xử lý!");
        }
        contact.Status = args.Status;
        contact.UserName = User.GetUserName();
        contact.ModifiedDate = DateTime.Now;
        _context.Contacts.Update(contact);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        if (!User.IsInRole(RoleName.ADMIN)) return BadRequest("Bạn không có quyền xóa!");
        var contact = await _context.Contacts.FindAsync(id);
        if (contact is null) return BadRequest("Không tìm thấy liên hệ!");
        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
