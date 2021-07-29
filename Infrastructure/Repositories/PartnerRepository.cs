using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class PartnerRepository : EfRepository<Partner>, IPartnerRepository
    {
        public PartnerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<Partner>> GetListAsync() => await _context.Partners.OrderByDescending(x => x.Id).ToListAsync();
    }
}
