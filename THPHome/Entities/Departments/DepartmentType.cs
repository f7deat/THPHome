using THPHome.Entities;

namespace WebUI.Entities.Departments;

public class DepartmentType
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string NormalizedName { get; set; } = default!;
    public string Locale { get; set; } = default!;

    public List<Department>? Departments { get; set; }
}
