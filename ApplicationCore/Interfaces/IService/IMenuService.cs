using ApplicationCore.Entities;
using ApplicationCore.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IMenuService
    {
        Task<IReadOnlyList<Menu>> GetListAsync(Language language, MenuType type = MenuType.DEFAULT);
        Task<object> AddAsync(Menu menu);
        Task<object> UpdateAsync(Menu menu);
        Task<object> DeleteAsyn(int id);
        Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
    }
}
