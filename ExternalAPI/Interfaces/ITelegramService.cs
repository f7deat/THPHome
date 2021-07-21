using System.Threading.Tasks;

namespace ExternalAPI.Interfaces
{
    public interface ITelegramService
    {
        Task<bool> SendMessageAsync(string message);
    }
}
