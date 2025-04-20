using THPCore.Models;

namespace THPHome.Models.Filters.Settings;

public class LocalizationFilterOptions : FilterOptions
{
    public string? Key { get; set; }
    public string? Value { get; set; }
}
