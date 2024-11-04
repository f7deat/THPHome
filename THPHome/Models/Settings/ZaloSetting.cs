namespace WebUI.Models.Settings;

public class ZaloSetting
{
    public string RefreshToken { get; set; } = default!;
    public DateTime ExpiredDate { get; set; }
}
