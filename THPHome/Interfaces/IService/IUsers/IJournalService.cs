using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IJournalService
{
    Task<THPResult> AddAsync(Journal args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(Journal args);
    Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl);
}
