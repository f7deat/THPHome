namespace THPHome.Entities;

public class Block
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string NormalizedName { get; set; } = default!;
    public bool Active { get; set; }
}
