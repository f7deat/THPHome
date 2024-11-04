using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.Communications;

public class LogFilterOptions : FilterOptions
{
    public DateTime? SendDate { get; set; }
    public string? RecipientEmail { get; set; }
    public string? Subject { get; set; }
}
