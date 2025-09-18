using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface ITeachingExperienceService
{
    Task<THPResult> AddAsync(TeachingExperience args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<ListResult<object>> ListAsync(UserFilterOptions filterOptions);
    Task<THPResult> UpdateAsync(TeachingExperience args);
    Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl);
}
