using WebUI.Foundations;

namespace WebUI.Models.Blocks;

public class SponsorBlock : BaseBlock
{
    public List<SponsorItem> Sponsors { get; set; } = new();
    public int AutoPlay { get; set; }
    public int Speed { get; set; }
}

public class SponsorItem
{
    public string? Logo { get; set; }
    public string? Link { get; set; }
}
