namespace ApplicationCore.Models.Posts;

public class CategoryWithPost
{
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public List<PostView>? ListPosts { get; set; }
}
