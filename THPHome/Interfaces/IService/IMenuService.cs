using THPCore.Models;
using THPHome.Entities;
using THPHome.Models.Payload;
using THPHome.ViewModels;

namespace THPHome.Interfaces.IService;

public interface IMenuService
{
    Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload);
    Task<object> GetListAsync(MenuFilterOptions payload);
    Task<THPResult> AddAsync(Menu menu);
    Task<THPResult> UpdateAsync(Menu menu);
    Task<THPResult> DeleteAsyn(int id);
    Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
}
