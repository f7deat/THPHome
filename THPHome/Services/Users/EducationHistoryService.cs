using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;

namespace THPHome.Services.Users;

public class EducationHistoryService(IEducationHistoryRepository _educationHistoryRepository, ILogService _logService, IHCAService _hcaService) : IEducationHistoryService
{
    public async Task<THPResult> AddAsync(EducationHistory args)
    {
        args.CreatedDate = DateTime.Now;
        await _educationHistoryRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var data = await _educationHistoryRepository.FindAsync(id);
        if (data is null) return THPResult.Failed("Không tìm thấy quá trình học tập!");
        await _educationHistoryRepository.DeleteAsync(data);
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(EducationHistory args)
    {
        var data = await _educationHistoryRepository.FindAsync(args.Id);
        if (data is null) return THPResult.Failed("Không tìm thấy quá trình học tập!");
        data.ModifiedDate = DateTime.Now;
        data.Institution = args.Institution;
        data.Degree = args.Degree;
        data.GraduationYear = args.GraduationYear;
        data.Major = args.Major;
        await _educationHistoryRepository.UpdateAsync(data);
        return THPResult.Success;
    }

    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var educationHistory = await _educationHistoryRepository.FindAsync(id);
        if (educationHistory is null) return THPResult.Failed("Không tìm thấy thông tin về quá trình đào tạo");
        if (educationHistory.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho quá trình đào tạo này");
        educationHistory.EvidenceUrl = fileUrl;
        await _educationHistoryRepository.UpdateAsync(educationHistory);
        await _logService.AddAsync($"Cập nhật minh chứng cho quá trình đào tạo {educationHistory.Degree}.");
        return THPResult.Success;
    }
}
