using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;

namespace THPHome.Services.Users;

public class CityService(ICityRepository _cityRepository) : ICityService
{
    public Task<IEnumerable<SelectOption>> GetOptionsAsync(CitySelect select) => _cityRepository.GetOptionsAsync(select);
}
