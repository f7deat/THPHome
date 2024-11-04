using WebUI.Entities.Departments;

namespace ApplicationCore.Entities;

public class Department : BaseEntity<Guid>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string? Code { get; set; }
    public int DepartmentTypeId { get; set; }
    public string Locale { get; set; } = default!;

    public DepartmentType? DepartmentType { get; set; }
}
