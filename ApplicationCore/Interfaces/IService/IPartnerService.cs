using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IPartnerService
    {
        Task<IReadOnlyList<Partner>> GetListAsync(int status = -1);
        Task<dynamic> AddAsync(Partner partner);
        Task<dynamic> UpdateAsync(Partner partner);
        Task<dynamic> DeleteAsync(int id);
    }
}
