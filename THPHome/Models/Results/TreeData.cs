namespace WebUI.Models.Results;

public class TreeCategoryData
{
    public int Value { get; set; } = default!;
    public string? Label { get; set; }
    public IEnumerable<TreeCategoryData>? Children { get; set; }
}
