using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Models.Payload;
using ApplicationCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IMenuRepository : IAsyncRepository<Menu>
    {
        Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload);
        Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
    }
}
