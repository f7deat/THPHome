namespace THPHome.Helpers;

public class LanguageHelper
{
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
