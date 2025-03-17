using ApplicationCore.Entities;
using THPHome.Entities;
using WebUI.Models.Filters.Parners;
using WebUI.Models.ViewModel;

namespace ApplicationCore.Interfaces.IService;

public interface IPartnerService
{
    Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions);
    Task<dynamic> AddAsync(Partner partner);
    Task<dynamic> DeleteAsync(int id);
}
