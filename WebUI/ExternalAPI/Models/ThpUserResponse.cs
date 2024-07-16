using Newtonsoft.Json;

namespace WebUI.ExternalAPI.Models;

public class ThpUserResponse
{
    [JsonProperty("userName")]
    public string? UserName { get; set; }
}
