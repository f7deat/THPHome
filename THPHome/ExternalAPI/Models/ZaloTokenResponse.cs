using Newtonsoft.Json;

namespace WebUI.ExternalAPI.Models;

public class ZaloTokenResponse
{
    [JsonProperty("access_token")]
    public string? AccessToken { get; set; }
    [JsonProperty("refresh_token")]
    public string? RefreshToken { get; set; }
    [JsonProperty("expires_in")]
    public double ExpiresIn { get; set; }
}
