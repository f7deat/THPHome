using THPHome.Models.Filters;

namespace WebUI.Models.Args.Departments;

public class DepartmentFilterOptions : FilterOptions
{
    public int? DepartmentTypeId { get; set; }
}
