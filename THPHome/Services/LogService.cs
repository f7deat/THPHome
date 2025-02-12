using THPCore.Interfaces;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IService;

namespace THPHome.Services;

public class LogService(ApplicationDbContext _context, IHCAService _hcaService) : ILogService
{
    public async Task AddAsync(string message, LogLevel level = LogLevel.Information)
    {
        await _context.Logs.AddAsync(new ApplicationLog
        {
            CreatedDate = DateTime.Now,
            Message = message,
            UserName = _hcaService.GetUserName(),
            Level = level
        });
    }

    public async Task ExeptionAsync(Exception exception)
    {
        try
        {
            await _context.Logs.AddAsync(new ApplicationLog
            {
                CreatedDate = DateTime.Now,
                Message = exception.ToString(),
                UserName = _hcaService.GetUserName(),
                Level = LogLevel.Error
            });
            await _context.SaveChangesAsync();
        }
        catch (Exception)
        {
            // Next
        }
    }
}
