using ApplicationCore.Entities;

namespace ApplicationCore.Interfaces.IRepository;

public interface IBannerRepository : IAsyncRepository<Banner>
{
    Task<IReadOnlyList<Banner>> GetListAsync(BannerType? type, int pageSize);
    Task RemoveRangeAsync(long id);
}
