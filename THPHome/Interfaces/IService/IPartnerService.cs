using THPCore.Models;
using THPHome.Entities;
using WebUI.Models.Filters.Parners;

namespace THPHome.Interfaces.IService;

public interface IPartnerService
{
    Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions);
    Task<dynamic> AddAsync(Partner partner);
    Task<dynamic> DeleteAsync(int id);
}
