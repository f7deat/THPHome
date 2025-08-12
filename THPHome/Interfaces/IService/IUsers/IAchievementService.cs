using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Models.Users.Achievements;

namespace THPHome.Interfaces.IService.IUsers;

public interface IAchievementService
{
    Task<THPResult> AddAsync(Achievement args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(Achievement args);
    Task<THPResult> UploadEvidenceAsync(Guid id, string fileUrl);
}
