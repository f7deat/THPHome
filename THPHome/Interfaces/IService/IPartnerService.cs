using ApplicationCore.Entities;
using THPHome.Entities;
using THPHome.Models.ViewModel;
using WebUI.Models.Filters.Parners;

namespace ApplicationCore.Interfaces.IService;

public interface IPartnerService
{
    Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions);
    Task<dynamic> AddAsync(Partner partner);
    Task<dynamic> DeleteAsync(int id);
}
