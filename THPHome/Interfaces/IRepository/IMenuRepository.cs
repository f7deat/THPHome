using ApplicationCore.Enums;
using ApplicationCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.Payload;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IMenuRepository : IAsyncRepository<Menu>
    {
        Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload);
        Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
    }
}
