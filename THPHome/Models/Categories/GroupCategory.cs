using THPHome.Entities;

namespace THPHome.Models.Categories;

public class GroupCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Icon { get; set; }
    public List<Category> Childs { get; set; } = [];
}
