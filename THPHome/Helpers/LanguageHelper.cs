using ApplicationCore.Enums;

namespace THPHome.Helpers;

public class LanguageHelper
{
    public static Language GetLanguage(string? locale)
    {
        if (string.IsNullOrEmpty(locale)) return Language.VI;
        return locale switch
        {
            "en-US" => Language.EN,
            "zh-CN" => Language.ZH,
            "ja-JP" => Language.JP,
            "ko-KR" => Language.KR,
            _ => Language.VI,
        };
    }

    public static bool IsAvailable(string? locale)
    {
        if (string.IsNullOrWhiteSpace(locale)) return false;
        return locale switch
        {
            "vi-VN" => true,
            "en-US" => true,
            "zh-CN" => true,
            "ja-JP" => true,
            "ko-KR" => true,
            _ => false,
        };
    }
}
