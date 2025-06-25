using THPHome.Entities;
using THPCore.Models;

namespace THPHome.Models.Payload;

public class ListMenuPayload : FilterOptions
{
    public MenuType Type { get; set; } = MenuType.MAIN;
    public int ParentId { get; set; }
    public int? DepartmentId { get; set; }
}

public class MenuFilterOptions : FilterOptions
{
    public MenuType? Type { get; set; } = MenuType.MAIN;
    public int? DepartmentId { get; set; }
}