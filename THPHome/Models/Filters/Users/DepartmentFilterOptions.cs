using THPCore.Models;
namespace THPHome.Models.Filters.Users;

public class DepartmentUserFilterOptions : FilterOptions
{
    public int? Code { get; set; }
    public string? Name { get; set; }
    public int? DepartmentId { get; set; }
}
