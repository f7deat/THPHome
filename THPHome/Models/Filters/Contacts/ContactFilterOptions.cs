using ApplicationCore.Models.Filters;

namespace THPHome.Models.Filters.Contacts;

public class ContactFilterOptions : FilterOptions
{
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? School { get; set; }
}
