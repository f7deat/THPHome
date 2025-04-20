using THPCore.Models;

namespace THPHome.Models.Filters.Communications;

public class LogFilterOptions : FilterOptions
{
    public string? RecipientEmail { get; set; }
    public string? Subject { get; set; }
}
