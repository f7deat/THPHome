using Microsoft.AspNetCore.Identity;
using WebUI.Entities;

namespace WebUI.Interfaces.IService;

public interface ISettingService
{
    Task<IReadOnlyList<ApplicationSetting>> ListAsync();
}
