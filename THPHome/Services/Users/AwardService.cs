using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;

namespace THPHome.Services.Users;

public class AwardService(IAwardRepository _awardRepository) : IAwardService
{
    public async Task<THPResult> AddAsync(Award args)
    {
        await _awardRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var award = await _awardRepository.FindAsync(id);
        if (award is null) return THPResult.Failed("Không tìm thấy giải thưởng!");
        await _awardRepository.DeleteAsync(award);
        return THPResult.Success;
    }

    public Task<object?> ListAsync(AwardFilterOptions filterOptions) => _awardRepository.ListAsync(filterOptions);

    public async Task<THPResult> UpdateAsync(Award args)
    {
        var award = await _awardRepository.FindAsync(args.Id);
        if (award is null) return THPResult.Failed("Không tìm thấy giải thưởng!");
        award.Name = args.Name;
        await _awardRepository.UpdateAsync(award);
        return THPResult.Success;
    }
}
