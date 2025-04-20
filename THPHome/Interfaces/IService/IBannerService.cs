using THPCore.Models;
using THPHome.Entities;
using THPHome.Models.Filters.Settings;

namespace THPHome.Interfaces.IService;

public interface IBannerService
{
    Task<Banner> AddAsync(Banner banner);
    Task<ListResult<Banner>> GetListAsync(BannerFilterOptions filterOptions);
    Task<dynamic> DeleteAsync(int id);
    Task<bool> UpdateAsync(Banner banner);
}
