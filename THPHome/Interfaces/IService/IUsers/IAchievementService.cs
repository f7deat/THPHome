using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IAchievementService
{
    Task<THPResult> AddAsync(Achievement args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(Achievement args);
}
