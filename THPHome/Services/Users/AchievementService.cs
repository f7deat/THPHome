using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;

namespace THPHome.Services.Users;

public class AchievementService(IAchievementRepository _achievementRepository, ILogService _logService) : IAchievementService
{
    public async Task<THPResult> AddAsync(Achievement args)
    {
        await _achievementRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var achievement = await _achievementRepository.FindAsync(id);
        if (achievement is null) return THPResult.Failed("Achievement not found");
        await _logService.AddAsync($"Xóa thành tựu {achievement.Name}.");
        await _achievementRepository.DeleteAsync(achievement);
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(Achievement args)
    {
        var achievement = await _achievementRepository.FindAsync(args.Id);
        if (achievement is null) return THPResult.Failed("Achievement not found");
        achievement.Name = args.Name;
        achievement.AchievementDate = args.AchievementDate;
        await _achievementRepository.UpdateAsync(achievement);
        return THPResult.Success;
    }
}
