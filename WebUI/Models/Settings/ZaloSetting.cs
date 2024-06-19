namespace WebUI.Models.Settings
{
    public class ZaloSetting
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
        public DateTime ExpiredDate { get; set; }
    }
}
