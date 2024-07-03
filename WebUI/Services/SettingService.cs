using Infrastructure;
using Microsoft.AspNetCore.Identity;
using WebUI.Entities;
using WebUI.ExternalAPI.Interfaces;
using WebUI.Interfaces.IRepository;
using WebUI.Interfaces.IService;

namespace WebUI.Services;

public class SettingService : ISettingService
{
    private readonly ISettingRepository _settingRepository;
    private readonly IZaloAPI _zaloAPI;
    private readonly ApplicationDbContext _context;

    public SettingService(ISettingRepository settingRepository, IZaloAPI zaloAPI, ApplicationDbContext context)
    {
        _settingRepository = settingRepository;
        _zaloAPI = zaloAPI;
        _context = context;
    }

    public Task<IReadOnlyList<ApplicationSetting>> ListAsync() => _settingRepository.ListAllAsync();
}
