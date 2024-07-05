using ApplicationCore.Entities;

namespace WebUI.Models.Categories;

public class TreeCategoryItem
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public CategoryStatus? Status { get; set; }
    public int Count { get; set; }
    public int? ParentId { get; set; }
    public IEnumerable<TreeCategoryItem>? Children { get; set; }
}
