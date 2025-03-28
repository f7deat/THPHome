using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities.Contacts;
using THPHome.Helpers.Validators;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Contacts;
using THPHome.Models.ViewModel;
using THPIdentity.Constants;
using WebUI.Foundations;
using WebUI.Interfaces.IService;

namespace THPHome.Controllers;

public class ContactController(ApplicationDbContext context, ITelegramService _telegramService, IContactService _contactService) : BaseController(context)
{
    [HttpPost("get-quote"), AllowAnonymous]
    public async Task<IActionResult> GetQuoteAsync([FromBody] Contact args)
    {
        if (string.IsNullOrWhiteSpace(args.FullName)) return BadRequest("Vui lòng nhập họ và tên!");
        if (!PhoneNumberValidator.ValidateVietnamPhoneNumber(args.PhoneNumber)) return BadRequest("Số điện thoại không hợp lệ!");
        if (await _context.Contacts.AnyAsync(x => x.PhoneNumber == args.PhoneNumber)) return BadRequest("Số điện thoại đã tồn tại!");
        args.CreatedDate = DateTime.Now;
        args.ContactStatusId = 1;
        await _context.Contacts.AddAsync(args);

        await _telegramService.SendMessageAsync($"Liên hệ mới {args.FullName} - {args.PhoneNumber}!");

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
        if (filterOptions.ContactStatusId != null)
        {
            query = query.Where(x => x.ContactStatusId == filterOptions.ContactStatusId);
        }
        if (filterOptions.Source != null)
        {
            query = query.Where(x => x.Source == filterOptions.Source);
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
        contact.ContactStatusId = args.ContactStatusId;
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

    [HttpGet("status-options")]
    public async Task<IActionResult> StatusOptionsAsync() => Ok(await _context.ContactStatuses.Select(x => new
    {
        label = x.Name,
        value = x.Id,
        disabled = x.Id == 1
    }).OrderBy(x => x.label).ToListAsync());

    [HttpGet("list-status")]
    public async Task<IActionResult> ListStatusAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _context.ContactStatuses
                    select new
                    {
                        a.Id,
                        a.CreatedDate,
                        a.Name,
                        a.Description,
                        a.CreatedBy,
                        a.ModifiedDate,
                        a.ModifiedBy,
                        ContactCount = _context.Contacts.Count(x => x.ContactStatusId == a.Id)
                    };
        query = query.OrderByDescending(x => x.CreatedDate);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpPost("delete-status/{id}")]
    public async Task<IActionResult> DeleteStatusAsync([FromRoute] int id)
    {
        var status = await _context.ContactStatuses.FindAsync(id);
        if (status is null) return BadRequest("Status not found!");
        if (await _context.Contacts.AnyAsync(x => x.ContactStatusId == id)) return BadRequest("Không thể xóa trạng thái đã gắn với liên hệ!");
        _context.ContactStatuses.Remove(status);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("update-status-name")]
    public async Task<IActionResult> UpdateStatusNameAsync([FromBody] ContactStatus args)
    {
        var status = await _context.ContactStatuses.FindAsync(args.Id);
        if (status is null) return BadRequest("Status not found");
        status.ModifiedBy = User.GetUserName();
        status.Name = args.Name;
        status.Description = args.Description;
        status.ModifiedDate = DateTime.Now;
        _context.ContactStatuses.Update(status);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("add-status")]
    public async Task<IActionResult> AddStatusAsync([FromBody] ContactStatus args)
    {
        if (await _context.ContactStatuses.AnyAsync(x => x.Name.ToLower() == args.Name.ToLower())) return BadRequest("Trạng thái đã tồn tại!");
        args.CreatedDate = DateTime.Now;
        args.CreatedBy = User.GetUserName();
        await _context.ContactStatuses.AddAsync(args);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("export"), AllowAnonymous]
    public async Task<IActionResult> ExportAsync()
    {
        var result = await _contactService.ExportAsync();
        if (!result.Succeeded) return BadRequest(result.Message);
        if (result.Data is null) return BadRequest("Data not found!");
        return File(result.Data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"contact-{DateTime.Now:dd-MM-yyyy}.xlsx");
    }
}
