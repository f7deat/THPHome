namespace THPHome.Models.Layouts;

public class Breadcrumb
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string Url { get; set; } = default!;
    public string? Icon { get; set; }
    public bool IsActive { get; set; }
}
