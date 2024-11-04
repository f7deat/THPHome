using THPCore.Enums;

namespace WebUI.Models.Args.Communications;

public class SendEmailArgs
{
    public UserType? UserType { get; set; }
    public int? DepartmentId { get; set; }
    public string? Token { get; set; }
}

public class SendEmailByExcelArgs
{
    public IFormFile? File { get; set; }
}
