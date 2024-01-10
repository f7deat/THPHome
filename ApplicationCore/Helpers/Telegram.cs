using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace ApplicationCore.Helpers
{
    public class Telegram
    {
        public static async Task<bool> SendMessageAsync(string message)
        {
            try
            {
                string url = $"https://api.telegram.org/bot1017931181:AAG2pumlDqYBXn8GINp99Cq_e6lk23YuVWg/sendMessage?chat_id=-585477510&text={message}&parse_mode=HTML&disable_web_page_preview=true";

                using (var _httpClient = new HttpClient())
                {
                    var response = await _httpClient.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
