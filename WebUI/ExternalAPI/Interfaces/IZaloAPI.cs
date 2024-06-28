using ApplicationCore.Entities;

namespace WebUI.ExternalAPI.Interfaces;

public interface IZaloAPI
{
    Task<string> CreateArticle(Post post);
}
