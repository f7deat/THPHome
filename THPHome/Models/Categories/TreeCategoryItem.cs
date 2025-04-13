using THPCore.Infrastructures;
using THPHome.Entities;

namespace THPHome.Models.Categories;

public class TreeCategoryItem : BaseEntity<int>
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public CategoryStatus? Status { get; set; }
    public int Count { get; set; }
    public int? ParentId { get; set; }
    public bool IsDisplayOnHome { get; set; }
    public int? DepartmentId { get; set; }
    public IEnumerable<TreeCategoryItem>? Children { get; set; }
}
