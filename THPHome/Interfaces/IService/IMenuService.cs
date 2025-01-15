using ApplicationCore.Models.Filters;
using ApplicationCore.ViewModels;
using THPHome.Entities;
using THPHome.Models.Payload;

namespace THPHome.Interfaces.IService;

public interface IMenuService
{
    Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload);
    Task<object> GetListAsync(FilterOptions payload);
    Task<object> AddAsync(Menu menu);
    Task<object> UpdateAsync(Menu menu);
    Task<object> DeleteAsyn(int id);
    Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
}
