using THPCore.Interfaces;

namespace THPHome.Models.Filters;

public class FilterOptions : IFilterOptions, ILocale
{
    public int Current { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string Locale { get; set; } = "vi-VN";
}
