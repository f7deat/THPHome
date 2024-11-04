using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Models.Payload;
using ApplicationCore.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IMenuService
    {
        Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload);
        Task<object> AddAsync(Menu menu);
        Task<object> UpdateAsync(Menu menu);
        Task<object> DeleteAsyn(int id);
        Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
    }
}
