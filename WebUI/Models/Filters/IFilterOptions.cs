using ApplicationCore.Enums;
using THPCore.Interfaces;
using WebUI.Helpers;

namespace ApplicationCore.Models.Filters;

public class FilterOptions : IFilterOptions
{
    public int Current { get; set; } = 1;
    private Language language;
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Locale { get; set; }
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
