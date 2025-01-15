using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.Payload;
using THPHome.ViewModels;

namespace THPHome.Interfaces.IRepository;

public interface IMenuRepository : IAsyncRepository<Menu>
{
    Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload);
    Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
}
