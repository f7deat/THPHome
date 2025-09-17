using THPCore.Models;
using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Models.Filters.Users;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class TeachingExperienceRepository(ApplicationDbContext context) : EfRepository<TeachingExperience>(context), ITeachingExperienceRepository
{
    public async Task<ListResult<object>> ListAsync(UserFilterOptions filterOptions)
    {
        var query = from a in _context.TeachingExperiences
                    select a;
        if (!string.IsNullOrEmpty(filterOptions.UserName))
        {
            query = query.Where(x => x.UserName == filterOptions.UserName);
        }
        return await ListResult<object>.Success(query, filterOptions);
    }
}
