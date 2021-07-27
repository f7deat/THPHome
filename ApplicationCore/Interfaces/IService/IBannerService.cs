using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IBannerService
    {
        Task<Banner> AddAsync(Banner banner);
        Task<IReadOnlyList<Banner>> GetListAsync(BannerType? type = null, int pageSize = 10);
        Task<dynamic> DeleteAsync(int id);
        Task<IEnumerable<Banner>> GetListAsync(long id);
        Task<bool> UpdateAsync(Banner banner);
    }
}
