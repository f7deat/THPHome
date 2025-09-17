using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;
using THPHome.Repositories.Users;

namespace THPHome.Services.Users;

public class TeachingExperienceService(ITeachingExperienceRepository _teachingExperienceRepository, ILogService _logService, IHCAService _hcaService) : ITeachingExperienceService
{
    public async Task<THPResult> AddAsync(TeachingExperience args)
    {
        args.CreatedDate = DateTime.Now;
        await _teachingExperienceRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var data = await _teachingExperienceRepository.FindAsync(id);
        if (data is null) return THPResult.Failed("Data not found");
        await _teachingExperienceRepository.DeleteAsync(data);
        return THPResult.Success;
    }

    public Task<ListResult<object>> ListAsync(UserFilterOptions filterOptions) => _teachingExperienceRepository.ListAsync(filterOptions);

    public async Task<THPResult> UpdateAsync(TeachingExperience args)
    {
        var data = await _teachingExperienceRepository.FindAsync(args.Id);
        if (data is null) return THPResult.Failed("Data not found");
        data.CourseName = args.CourseName;
        data.CourseCode = args.CourseCode;
        data.ModifiedDate = DateTime.Now;
        data.Level = args.Level;
        data.Description = args.Description;
        await _teachingExperienceRepository.UpdateAsync(data);
        return THPResult.Success;
    }
    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var teachingExperience = await _teachingExperienceRepository.FindAsync(id);
        if (teachingExperience is null) return THPResult.Failed("Không tìm thấy thông tin về kinh nghiệm giảng dạy");
        if (teachingExperience.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho kinh nghiệm giảng dạy này");
        teachingExperience.EvidenceUrl = fileUrl;
        await _teachingExperienceRepository.UpdateAsync(teachingExperience);
        await _logService.AddAsync($"Cập nhật minh chứng cho kinh nghiệm giảng dạy {teachingExperience.CourseName}.");
        return THPResult.Success;
    }
}
