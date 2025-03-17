using ApplicationCore.Entities;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using WebUI.Models.Filters.Parners;
using WebUI.Models.ViewModel;

namespace ApplicationCore.Interfaces.IRepository;

public interface IPartnerRepository : IAsyncRepository<Partner>
{
    Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions);
}
