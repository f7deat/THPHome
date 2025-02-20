using THPHome.Foundations;

namespace THPHome.Models.Blocks;

public class SponsorBlock : BaseBlock
{
    public List<SponsorItem> Items { get; set; } = [];
    public AutoPlay? AutoPlay { get; set; }
    public int Speed { get; set; }
}

public class SponsorItem
{
    public string? Logo { get; set; }
    public string? Link { get; set; }
}

public class AutoPlay
{
    public int Delay { get; set; }
}