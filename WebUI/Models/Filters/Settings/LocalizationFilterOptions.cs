using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.Settings;

public class LocalizationFilterOptions : FilterOptions
{
    public string? Locale { get; set; }
}
