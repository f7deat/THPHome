using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;

namespace THPHome.Services.Users;

public class AchievementService(IAchievementRepository _achievementRepository, ILogService _logService, IHCAService _hcaService) : IAchievementService
{
    public async Task<THPResult> AddAsync(Achievement args)
    {
        args.CreatedDate = DateTime.Now;
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
        achievement.Year = args.Year;
        await _achievementRepository.UpdateAsync(achievement);
        return THPResult.Success;
    }

    public async Task<THPResult> UploadEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var achievement = await _achievementRepository.FindAsync(id);
        if (achievement is null) return THPResult.Failed("Không tìm thấy thành tựu");
        if (achievement.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho thành tựu này");
        achievement.EvidenceUrl = fileUrl;
        achievement.ModifiedDate = DateTime.Now;
        await _achievementRepository.UpdateAsync(achievement);
        await _logService.AddAsync($"Cập nhật minh chứng cho thành tựu {achievement.Name}.");
        return THPResult.Success;
    }
}
