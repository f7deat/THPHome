using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.ViewModel;
using WebUI.Models.Filters.Settings;

namespace THPHome.Interfaces.IRepository;

public interface IBannerRepository : IAsyncRepository<Banner>
{
    Task<ListResult<Banner>> GetListAsync(BannerFilterOptions filterOptions);
    Task RemoveRangeAsync(long id);
}
