using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Repositories.Users;

namespace THPHome.Services.Users;

public class ResearchProjectService(IResearchProjectRepository _researchProjectRepository, ILogService _logService, IHCAService _hcaService) : IResearchProjectService
{
    public async Task<THPResult> AddAsync(ResearchProject args)
    {
        args.CreatedDate = DateTime.Now;
        await _researchProjectRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var data = await _researchProjectRepository.FindAsync(id);
        if (data is null) return THPResult.Failed("Data not found");
        await _researchProjectRepository.DeleteAsync(data);
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(ResearchProject args)
    {
        var data = await _researchProjectRepository.FindAsync(args.Id);
        if (data is null) return THPResult.Failed("Data not found");
        data.Name = args.Name;
        data.StartYear = args.StartYear;
        data.EndYear = args.EndYear;
        data.ModifiedDate = DateTime.Now;
        data.Status = args.Status;
        data.Result = args.Result;
        data.Role = args.Role;
        data.Level = args.Level;
        await _researchProjectRepository.UpdateAsync(data);
        return THPResult.Success;
    }

    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var researchProject = await _researchProjectRepository.FindAsync(id);
        if (researchProject is null) return THPResult.Failed("Không tìm thấy thông tin về nghiên cứu khoa học");
        if (researchProject.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho nghiên cứu khoa học này");
        researchProject.EvidenceUrl = fileUrl;
        await _researchProjectRepository.UpdateAsync(researchProject);
        await _logService.AddAsync($"Cập nhật minh chứng cho nghiên cứu khoa học {researchProject.Name}.");
        return THPResult.Success;
    }
}
