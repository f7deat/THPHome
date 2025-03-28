using System.Collections.Generic;
using System.Threading.Tasks;
using THPHome.Entities;
using THPHome.Models.ViewModel;
using WebUI.Models.Filters.Settings;

namespace ApplicationCore.Interfaces.IService
{
    public interface IBannerService
    {
        Task<Banner> AddAsync(Banner banner);
        Task<ListResult<Banner>> GetListAsync(BannerFilterOptions filterOptions);
        Task<dynamic> DeleteAsync(int id);
        Task<bool> UpdateAsync(Banner banner);
    }
}
