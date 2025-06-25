using THPCore.Interfaces;

namespace THPHome.Models.Filters;

public class Select : ILocale
{
    public string? KeyWords { get; set; }
    public int? DepartmentId { get; set; }
    public string Locale { get; set; } = "vi-VN";
}
