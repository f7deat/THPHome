using ApplicationCore.Enums;
using THPCore.Interfaces;
using THPHome.Helpers;

namespace THPHome.Models.Filters;

public class FilterOptions : IFilterOptions
{
    public int Current { get; set; } = 1;
    private Language language;
    public int PageSize { get; set; } = 10;
    public string? Locale { get; set; } = "vi-VN";
    public Language Language
    {
        get
        {
            if (string.IsNullOrEmpty(Locale))
            {
                return language;
            }
            return LanguageHelper.GetLanguage(Locale);
        }
        set { language = value; }
    }
}
