using Newtonsoft.Json;
using THPIdentity.Entities;

namespace THPHome.ExternalAPI.Models;

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
    [JsonProperty("gender")]
    public int? Gender { get; set; }
    [JsonProperty("dateOfBirth")]
    public DateTime? DateOfBirth { get; set; }
    [JsonProperty("userType")]
    public UserType UserType { get; set; }
    [JsonProperty("departmentId")]
    public int? DepartmentId { get; set; }
}
