using THPCore.Models;
using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Models.Filters.Users;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class AwardRepository(ApplicationDbContext context) : EfRepository<Award>(context), IAwardRepository
{
    public async Task<object?> ListAsync(AwardFilterOptions filterOptions)
    {
        var query = from a in _context.Awards
                    select a;
        if (!string.IsNullOrEmpty(filterOptions.UserName))
        {
            query = query.Where(x => x.UserName == filterOptions.UserName);
        }
        query = query.OrderByDescending(x => x.Year);
        return await ListResult<object>.Success(query, filterOptions);
    }
}
