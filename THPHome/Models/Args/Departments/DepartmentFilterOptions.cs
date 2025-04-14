using THPHome.Models.Filters;

namespace THPHome.Models.Args.Departments;

public class DepartmentFilterOptions : FilterOptions
{
    public int? DepartmentTypeId { get; set; }
}
