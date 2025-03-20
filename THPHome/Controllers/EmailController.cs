using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using THPCore.Interfaces;
using THPHome.Data;
using THPHome.Models.Args.Communications;
using WebUI.Entities.Communications;
using WebUI.ExternalAPI.Interfaces;
using WebUI.Foundations;
using WebUI.Models.Filters.Communications;

namespace THPHome.Controllers;

public class EmailController(ApplicationDbContext context, ITHPAuthen _thpAuthen, IEmailSender _emailSender) : BaseController(context)
{
    [HttpGet("logs")]
    public async Task<IActionResult> GetLogsAsync([FromQuery] LogFilterOptions filterOptions)
    {
        var query = _context.EmailLogs.Where(x => string.IsNullOrEmpty(filterOptions.RecipientEmail) || x.RecipientEmail == filterOptions.RecipientEmail);
        if (!string.IsNullOrWhiteSpace(filterOptions.Subject))
        {
            query = query.Where(x => x.Subject.ToLower() == filterOptions.Subject.ToLower());
        }
        query = query.OrderByDescending(x => x.SendDate);
        return Ok(new
        {
            data = await query.Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync(),
            total = await query.CountAsync()
        });
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendAsync([FromBody] SendEmailArgs args)
    {
        Request.Headers.TryGetValue("Authorization", out var authHeader);
        var token = authHeader.ToString().Replace("Bearer ", "", StringComparison.OrdinalIgnoreCase);
        args.Token = token;
        var users = await _thpAuthen.GetListUser(args);
        if (!users.Any()) return BadRequest("Không tìm thấy người dùng!");

        return Ok(IdentityResult.Success);
    }


    [HttpPost("send-by-excel")]
    public async Task<IActionResult> AcepptanceLetter([FromForm] SendEmailByExcelArgs args)
    {
        try
        {
            if (args.File is null || args.File.Length < 1) return BadRequest("File not found!");
            using var pgk = new ExcelPackage(args.File.OpenReadStream());
            var ws = pgk.Workbook.Worksheets.First();
            var rowCount = ws.Dimension.End.Row;
            for (int row = 2; row <= rowCount; row++)
            {
                var body = ws.Cells[row, 6].Value?.ToString();
                if (string.IsNullOrWhiteSpace(body)) continue;

                var subject = ws.Cells[row, 5].Value?.ToString();
                if (string.IsNullOrWhiteSpace(subject)) continue;

                var email = ws.Cells[row, 3].Value?.ToString()?.Trim();
                if (string.IsNullOrEmpty(email)) continue;

                var log = new EmailLog
                {
                    Body = body,
                    Subject = subject,
                    RecipientEmail = email,
                    SendDate = DateTime.Now,
                    Status = EmailStatus.Successful,
                    Note = ws.Cells[row, 2].Value?.ToString()
                };
                var response = await _emailSender.SendAsync(email, subject, body);
                if (!string.IsNullOrEmpty(response))
                {
                    log.Status = EmailStatus.Failed;
                    log.Note = response;
                }
                await _context.EmailLogs.AddAsync(log);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }
}
