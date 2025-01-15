using ApplicationCore.Entities;
using THPHome.Interfaces.Base;
using WebUI.Models.Filters.Settings;
using WebUI.Models.ViewModel;

namespace ApplicationCore.Interfaces.IRepository;

public interface IBannerRepository : IAsyncRepository<Banner>
{
    Task<ListResult<Banner>> GetListAsync(BannerFilterOptions filterOptions);
    Task RemoveRangeAsync(long id);
}
