using ApplicationCore.Enums;
using WebUI.Helpers;

namespace ApplicationCore.Models.Filters;

public interface IFilterOptions
{
    int PageIndex { get; set; }
    int PageSize { get; set; }
}

public class FilterOptions : IFilterOptions
{
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
