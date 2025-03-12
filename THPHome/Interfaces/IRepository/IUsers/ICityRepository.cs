using THPHome.Entities.Users;
using THPHome.Interfaces.Base;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IRepository.IUsers;

public interface ICityRepository : IAsyncRepository<City>
{
    Task<IEnumerable<SelectOption>> GetOptionsAsync(CitySelect select);
}
