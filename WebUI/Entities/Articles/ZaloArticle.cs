using ApplicationCore.Entities;

namespace WebUI.Entities.Articles;

public class ZaloArticle : BaseEntity<Guid>
{
    public long PostId { get; set; }
    public string? Token { get; set; }
}
