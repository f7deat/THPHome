using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IWorkingExperienceService
{
    Task<THPResult> AddAsync(WorkingExperience args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(WorkingExperience args);
}
