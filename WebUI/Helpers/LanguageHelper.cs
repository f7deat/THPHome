using ApplicationCore.Enums;

namespace WebUI.Helpers;

public class LanguageHelper
{
    public static Language GetLanguage(string? locale)
    {
        if (string.IsNullOrEmpty(locale)) return Language.VI;
        return locale switch
        {
            "en-US" => Language.EN,
            _ => Language.VI,
        };
    }
}
