using THPHome.Entities;

namespace THPHome.ExternalAPI.Interfaces;

public interface IZaloAPI
{
    Task<string?> CreateArticle(Post post);
    Task<string?> GetAccessTokenAsync();
}
