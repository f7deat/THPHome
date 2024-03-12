namespace WebUI.Entities;

public class PostBlock
{
    public Guid Id { get; set; }
    public long PostId { get; set; }
    public Guid BlockId { get; set; }
    public int SortOrder { get; set; }
    public string Name { get; set; } = default!;
    public string? Data { get; set; }
    public bool Active { get; set; }
}
