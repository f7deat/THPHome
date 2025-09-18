using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Repositories.Users;

namespace THPHome.Services.Users;

public class WorkingExperienceService(IWorkingExperienceRepository _workingExperienceRepository, ILogService _logService, IHCAService _hcaService) : IWorkingExperienceService
{
    public async Task<THPResult> AddAsync(WorkingExperience args)
    {
        args.CreatedDate = DateTime.Now;
        await _workingExperienceRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var workingExperience = await _workingExperienceRepository.FindAsync(id);
        if (workingExperience is null) return THPResult.Failed("Working Experience not found");
        await _logService.AddAsync($"Working Experience {workingExperience.CompanyName} deleted");
        await _workingExperienceRepository.DeleteAsync(workingExperience);
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(WorkingExperience args)
    {
        var workingExperience = await _workingExperienceRepository.FindAsync(args.Id);
        if (workingExperience is null) return THPResult.Failed("Working Experience not found");
        workingExperience.CompanyName = args.CompanyName;
        workingExperience.Position = args.Position;
        workingExperience.StartDate = args.StartDate;
        workingExperience.EndDate = args.EndDate;
        workingExperience.Description = args.Description;
        workingExperience.ModifiedDate = DateTime.Now;
        await _workingExperienceRepository.UpdateAsync(workingExperience);
        return THPResult.Success;
    }

    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var workingExperience = await _workingExperienceRepository.FindAsync(id);
        if (workingExperience is null) return THPResult.Failed("Không tìm thấy thông tin về quá trình công tác");
        if (workingExperience.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho quá trình công tác này");
        workingExperience.EvidenceUrl = fileUrl;
        await _workingExperienceRepository.UpdateAsync(workingExperience);
        await _logService.AddAsync($"Cập nhật minh chứng cho quá trình công tác {workingExperience.CompanyName}.");
        return THPResult.Success;
    }
}
