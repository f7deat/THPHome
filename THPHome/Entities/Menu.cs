using ApplicationCore.Entities;
using System.ComponentModel.DataAnnotations;

namespace THPHome.Entities;

public class Menu : BaseEntity<int>
{
    [StringLength(250)]
    public string? Name { get; set; }
    [StringLength(250)]
    public string? Url { get; set; }
    [StringLength(500)]
    public string? Description { get; set; }
    public MenuType Type { get; set; }
    public int Index { get; set; }
    public int? ParentId { get; set; }
    public int Status { get; set; }
    [StringLength(250)]
    public string? Icon { get; set; }
    public string? Mode { get; set; }
    public string Locale { get; set; } = default!;
}

public class MenuMode
{
    public const string Flyout = "Flyout";
    public const string Mega = "Mega";
}

public enum MenuType
{
    DEFAULT,
    TOP,
    MAIN,
    BOX
}
