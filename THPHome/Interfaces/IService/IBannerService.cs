using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebUI.Models.Filters.Settings;
using WebUI.Models.ViewModel;

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
