namespace WebUI.Interfaces.IService;

public interface IBlockService
{
    object? DeserializeObject(string normalizedName, string data);
}
