using THPHome.Foundations;

namespace WebUI.Models.Blocks;

public class TextBlock : BaseBlock
{
    public string Type { get; set; } = "paragraph";
    public string? Value { get; set; }
}
