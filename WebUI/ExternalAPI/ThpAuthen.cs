using Newtonsoft.Json;
using WebUI.ExternalAPI.Interfaces;
using WebUI.ExternalAPI.Models;

namespace WebUI.ExternalAPI;

public class ThpAuthen : ITHPAuthen
{
    private readonly HttpClient _httpClient;
    public ThpAuthen(HttpClient httpClient)
    {
        httpClient.BaseAddress = new Uri("https://authen.dhhp.edu.vn/api/");
        _httpClient = httpClient;
    }

    public async Task<ThpUserResponse?> LoginAsync(string userName, string password)
    {
        var response = await _httpClient.PostAsJsonAsync("user/login", new
        {
            userName, password
        });

        var user = JsonConvert.DeserializeObject<THPResponse<ThpUserResponse>>(await response.Content.ReadAsStringAsync());
        if (user is null) return null;
        return user.Data;
    }
}
