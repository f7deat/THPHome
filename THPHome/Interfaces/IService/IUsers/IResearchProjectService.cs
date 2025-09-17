using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IResearchProjectService
{
    Task<THPResult> AddAsync(ResearchProject args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(ResearchProject args);
    Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl);
}
