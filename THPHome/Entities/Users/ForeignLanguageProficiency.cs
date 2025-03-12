namespace THPHome.Entities.Users;

public class ForeignLanguageProficiency : THPIdentity.Entities.ForeignLanguageProficiency
{
    public string UserName { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
}
