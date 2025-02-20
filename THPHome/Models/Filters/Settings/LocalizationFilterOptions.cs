using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.Settings;

public class LocalizationFilterOptions : FilterOptions
{
    public string? Key { get; set; }
    public string? Value { get; set; }
}
