using ApplicationCore.Entities;
using WebUI.Entities.Departments;

namespace THPHome.Entities;

public class Department : BaseEntity<Guid>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public int? Code { get; set; }
    public int DepartmentTypeId { get; set; }
    public string Locale { get; set; } = default!;

    public DepartmentType? DepartmentType { get; set; }
}
