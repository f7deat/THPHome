using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;

namespace THPHome.Services.Users;

public class ResearchProjectService(IResearchProjectRepository _researchProjectRepository) : IResearchProjectService
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
        await _researchProjectRepository.UpdateAsync(data);
        return THPResult.Success;
    }
}
