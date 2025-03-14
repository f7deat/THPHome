using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;

namespace THPHome.Services.Users;

public class TeachingExperienceService(ITeachingExperienceRepository _teachingExperienceRepository) : ITeachingExperienceService
{
    public async Task<THPResult> AddAsync(TeachingExperience args)
    {
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
        await _teachingExperienceRepository.UpdateAsync(data);
        return THPResult.Success;
    }
}
