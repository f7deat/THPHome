using System.Text.RegularExpressions;

namespace THPHome.Helpers.Validators;

public class PhoneNumberValidator
{
    public static bool ValidateVietnamPhoneNumber(string? phoneNumber)
    {
        if (string.IsNullOrWhiteSpace(phoneNumber)) return false;
        // Biểu thức chính quy cho số điện thoại Việt Nam
        string pattern = @"^(0(9[0-9]|8[0-9]|7[0-9]|3[0-9]|5[0-9]|6[0-9]|4[0-9]))(\d{7})$";

        // Kiểm tra với biểu thức chính quy
        var regex = new Regex(pattern);
        return regex.IsMatch(phoneNumber);
    }
}
