using ApplicationCore.Interfaces.IRepository;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Models.Filters.Parners;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class PartnerRepository(ApplicationDbContext context) : EfRepository<Partner>(context), IPartnerRepository
{
    public async Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions)
    {
        var query = from a in _context.Partners
                    select new Partner
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Logo = a.Logo,
                        Url = a.Url,
                        Status = a.Status,
                        ModifiedDate = a.ModifiedDate,
                        Index = a.Index
                    };
        if (filterOptions.Status != null)
        {
            query = query.Where(x => x.Status == filterOptions.Status);
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.Name))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.Name) && x.Name.ToLower().Contains(filterOptions.Name));
        }
        return await ListResult<Partner>.Success(query, filterOptions);
    }
}
