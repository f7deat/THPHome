using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;

namespace THPHome.Services.Users;

public class WorkingExperienceService(IWorkingExperienceRepository _workingExperienceRepository, ILogService _logService) : IWorkingExperienceService
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
}
