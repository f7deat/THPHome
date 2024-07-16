using WebUI.ExternalAPI.Models;

namespace WebUI.ExternalAPI.Interfaces;

public interface ITHPAuthen
{
    Task<ThpUserResponse?> LoginAsync(string userName, string passWord);
}
