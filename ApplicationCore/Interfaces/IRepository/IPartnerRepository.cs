using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IPartnerRepository : IAsyncRepository<Partner>
    {
        Task<IReadOnlyList<Partner>> GetListAsync();
    }
}
