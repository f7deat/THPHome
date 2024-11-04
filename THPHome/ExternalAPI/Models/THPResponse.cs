using Newtonsoft.Json;

namespace WebUI.ExternalAPI.Models;

public class THPResponse<T> where T : class
{
    [JsonProperty("data")]
    public T? Data { get; set; }
}
