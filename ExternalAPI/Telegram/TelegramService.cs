using ExternalAPI.Interfaces;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace ExternalAPI.Telegram
{
    public class TelegramService : ITelegramService
    {
        private readonly HttpClient _httpClient;
        public TelegramService(HttpClient httpClient) => _httpClient = httpClient;
        public async Task<bool> SendMessageAsync(string text)
        {
            try
            {
                string url = $"https://api.telegram.org/bot1017931181:AAG2pumlDqYBXn8GINp99Cq_e6lk23YuVWg/sendMessage?chat_id=@defzonenet&text={text}&parse_mode=HTML&disable_web_page_preview=true";
                var response = await _httpClient.GetAsync(url);
                return response.IsSuccessStatusCode;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
