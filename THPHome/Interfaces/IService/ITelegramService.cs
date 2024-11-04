namespace WebUI.Interfaces.IService;

public interface ITelegramService
{
    Task SendMessageAsync(string message);
}
