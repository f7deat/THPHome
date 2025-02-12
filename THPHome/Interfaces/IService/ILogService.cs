namespace THPHome.Interfaces.IService;

public interface ILogService
{
    Task AddAsync(string message, LogLevel level = LogLevel.Information);
    Task ExeptionAsync(Exception exception);
}
