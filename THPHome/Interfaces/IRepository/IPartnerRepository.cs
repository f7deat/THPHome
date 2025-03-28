using ApplicationCore.Entities;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.ViewModel;
using WebUI.Models.Filters.Parners;

namespace ApplicationCore.Interfaces.IRepository;

public interface IPartnerRepository : IAsyncRepository<Partner>
{
    Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions);
}
