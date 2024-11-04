using WebUI.Foundations;

namespace WebUI.Models.Blocks;

public class SideGalleryBlock : BaseBlock
{
    public string? TextContent { get; set; }
    public List<string> Images { get; set; } = [];
}
