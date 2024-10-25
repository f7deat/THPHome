using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using WebUI.Models.Filters.Parners;
using WebUI.Models.ViewModel;

namespace Infrastructure.Repositories
{
    public class PartnerRepository : EfRepository<Partner>, IPartnerRepository
    {
        public PartnerRepository(ApplicationDbContext context) : base(context)
        {
        }

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
}
