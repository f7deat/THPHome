using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using WebUI.Interfaces.IService;
using WebUI.Options;

namespace WebUI.Services;

public class TelegramService(HttpClient httpClient, IOptions<SettingOptions> optionsAccessor) : ITelegramService
{
    private readonly HttpClient _httpClient = httpClient;

    public SettingOptions Options { get; } = optionsAccessor.Value;

    public async Task SendMessageAsync(string message)
    {
        try
        {
            string url = $"https://api.telegram.org/bot{Options.BOT}/sendMessage?chat_id={Options.ChatId}&text={message}&parse_mode=HTML&disable_web_page_preview=true";

            await _httpClient.GetAsync(url);
        }
        catch (Exception)
        {

        }
    }
}
