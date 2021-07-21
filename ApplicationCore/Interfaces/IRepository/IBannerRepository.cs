using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IBannerRepository : IAsyncRepository<Banner>
    {
        Task<IReadOnlyList<Banner>> GetListAsync(BannerType? type);
        Task<IEnumerable<Banner>> GetListAsync(long id);
        Task RemoveRangeAsync(long id);
    }
}
