using THPCore.Models;

namespace THPHome.Interfaces.IService;

public interface IContactService
{
    Task<THPResult<byte[]>> ExportAsync();
}
