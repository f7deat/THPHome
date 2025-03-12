using THPHome.Entities.Users;
using THPHome.Interfaces.Base;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IRepository.IUsers;

public interface IAwardRepository : IAsyncRepository<Award>
{
    Task<object?> ListAsync(AwardFilterOptions filterOptions);
}
