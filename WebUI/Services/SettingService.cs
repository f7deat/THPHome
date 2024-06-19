using WebUI.Entities;
using WebUI.Interfaces.IRepository;
using WebUI.Interfaces.IService;

namespace WebUI.Services;

public class SettingService : ISettingService
{
    private readonly ISettingRepository _settingRepository;
    public SettingService(ISettingRepository settingRepository)
    {
        _settingRepository = settingRepository;
    }

    public Task<IReadOnlyList<ApplicationSetting>> ListAsync() => _settingRepository.ListAllAsync();
}
