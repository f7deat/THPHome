namespace WebUI.Interfaces.IService;

public interface ILocalizeService
{
    Task<string> GetAsync(string key);
}
