namespace THPHome.Models.Api.Admin.User;

public class ConfirmEmailModel
{
    public string? UserId { get; set; }
    public string? Code { get; set; }
}
