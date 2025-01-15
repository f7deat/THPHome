using ApplicationCore.Entities;
using THPHome.Interfaces.Base;

namespace THPHome.Interfaces.IRepository;

public interface IVideoRepository : IAsyncRepository<Video>
{
    Task<IReadOnlyList<Video>> GetListAsync(int pageSize);
}
