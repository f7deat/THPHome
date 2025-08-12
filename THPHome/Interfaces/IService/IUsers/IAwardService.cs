using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IAwardService
{
    Task<THPResult> AddAsync(Award args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<object?> ListAsync(AwardFilterOptions filterOptions);
    Task<THPResult> UpdateAsync(Award args);
    Task<THPResult> UploadEvidenceAsync(Guid id, string fileUrl);
}
