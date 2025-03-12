using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface ICityService
{
    Task<IEnumerable<SelectOption>> GetOptionsAsync(CitySelect select);
}
