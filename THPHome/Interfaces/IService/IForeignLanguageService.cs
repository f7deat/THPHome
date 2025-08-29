using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService;

public interface IForeignLanguageService
{
    Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl);
}
