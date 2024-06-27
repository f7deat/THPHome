using ApplicationCore.Entities;

namespace WebUI.ExternalAPI.Interfaces;

public interface IZaloAPI
{
    Task CreateArticle(Post post);
}
