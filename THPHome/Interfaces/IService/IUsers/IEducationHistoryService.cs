using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IEducationHistoryService
{
    Task<THPResult> AddAsync(EducationHistory args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(EducationHistory args);
}
