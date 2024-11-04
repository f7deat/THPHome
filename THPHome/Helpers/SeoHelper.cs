using System.Text;
using System.Text.RegularExpressions;

namespace ApplicationCore.Helpers;

public class SeoHelper
{
    public static string ToSeoFriendly(string? title, bool removeSign = true)
    {
        if (string.IsNullOrEmpty(title)) return string.Empty;
        int maxLength = title.Length;
        var match = Regex.Match(title.ToLower(), "[\\w]+");
        StringBuilder result = new StringBuilder("");
        bool maxLengthHit = false;
        while (match.Success && !maxLengthHit)
        {
            if (result.Length + match.Value.Length <= maxLength)
            {
                result.Append(match.Value + "-");
            }
            else
            {
                maxLengthHit = true;
                // Handle a situation where there is only one word and it is greater than the max length.
                if (result.Length == 0) result.Append(match.Value.Substring(0, title.Length));
            }
            match = match.NextMatch();
        }
        // Remove trailing '-'
        if (result[^1] == '-') result.Remove(result.Length - 1, 1);
        if (removeSign)
        {
            return RemoveSign4VietnameseString(result.ToString()).ToLower();
        }
        return result.ToString().ToLower();
    }

    private static readonly string[] VietnameseSigns = new string[]
    {

        "aAeEoOuUiIdDyY",

        "áàạảãâấầậẩẫăắằặẳẵ",

        "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

        "éèẹẻẽêếềệểễ",

        "ÉÈẸẺẼÊẾỀỆỂỄ",

        "óòọỏõôốồộổỗơớờợởỡ",

        "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

        "úùụủũưứừựửữ",

        "ÚÙỤỦŨƯỨỪỰỬỮ",

        "íìịỉĩ",

        "ÍÌỊỈĨ",

        "đ",

        "Đ",

        "ýỳỵỷỹ",

        "ÝỲỴỶỸ"
    };

    public static string RemoveSign4VietnameseString(string str)
    {
        for (int i = 1; i < VietnameseSigns.Length; i++)
        {
            for (int j = 0; j < VietnameseSigns[i].Length; j++)
                str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
        }
        return str;
    }
}
