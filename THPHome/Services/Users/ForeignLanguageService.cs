using global::THPHome.Interfaces.IService.IUsers;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;

namespace THPHome.Services.Users;

public class ForeignLanguageService(IForeignLanguageRepository _foreignLanguageRepository, ILogService _logService, IHCAService _hcaService) : IForeignLanguageService
{
    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var foreignLanguage = await _foreignLanguageRepository.FindAsync(id);
        if (foreignLanguage is null) return THPResult.Failed("Không tìm thấy chứng chỉ ngoại ngữ");
        if (foreignLanguage.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho chứng chỉ ngoại ngữ này");
        foreignLanguage.EvidenceUrl = fileUrl;
        await _foreignLanguageRepository.UpdateAsync(foreignLanguage);
        await _logService.AddAsync($"Cập nhật minh chứng cho chứng chỉ ngoại ngữ {foreignLanguage.Certificate}.");
        return THPResult.Success;
    }
}
