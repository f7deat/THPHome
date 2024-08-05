using Newtonsoft.Json;

namespace WebUI.ExternalAPI.Models;

public class ThpUserResponse
{
    [JsonProperty("userName")]
    public string? UserName { get; set; }
    [JsonProperty("id")]
    public int Id { get; set; }
    [JsonProperty("password")]
    public string? Password { get; set; }
    [JsonProperty("firstName")]
    public string? FirstName { get; set; }
    [JsonProperty("lastName")]
    public string? LastName { get; set; }
    [JsonProperty("phoneNumber")]
    public string? PhoneNumber { get; set; }
    [JsonProperty("email")]
    public string? Email { get; set; }
    [JsonProperty("address")]
    public string? Address { get; set; }
    [JsonProperty("userType")]
    public int? UserType { get; set; }
}
