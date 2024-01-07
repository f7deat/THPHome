using ApplicationCore.Entities;
using ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IMenuRepository : IAsyncRepository<Menu>
    {
        Task<IReadOnlyList<Menu>> GetListAsync(Language language, MenuType type);
        Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type);
    }
}
