using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.Base;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IRepository.IUsers;

public interface ITeachingExperienceRepository : IAsyncRepository<TeachingExperience>
{
    Task<ListResult<object>> ListAsync(UserFilterOptions filterOptions);
}
