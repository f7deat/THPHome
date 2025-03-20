using THPHome.Data;
using WebUI.Entities;
using WebUI.Interfaces.IRepository;
using WebUI.Interfaces.IService;

namespace THPHome.Services;

public class SettingService(ISettingRepository _settingRepository) : ISettingService
{
    public Task<IReadOnlyList<ApplicationSetting>> ListAsync() => _settingRepository.ListAllAsync();
}
