namespace WebUI.Entities;

public class ApplicationSetting
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Key { get; set; } = default!;
    public string Value { get; set; } = default!;
    public string? Icon { get; set; }
    public string? Description { get; set; }
}
