using ApplicationCore.Entities;

namespace WebUI.Models.Api.Admin;

public class PostParam
{
    public Post Post { get; set; }
    public int[] ListCategoryId { get; set; }
    public List<Attachment> Attachments { get; set; }
}
