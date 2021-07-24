using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IMenuRepository : IAsyncRepository<Menu>
    {
        Task<IReadOnlyList<Menu>> GetListAsync(MenuType type);
    }
}
