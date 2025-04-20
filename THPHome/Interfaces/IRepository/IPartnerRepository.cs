using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.Filters.Parners;

namespace ApplicationCore.Interfaces.IRepository;

public interface IPartnerRepository : IAsyncRepository<Partner>
{
    Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions);
}
