using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BannerRepository : EfRepository<Banner>, IBannerRepository
    {
        public BannerRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<IReadOnlyList<Banner>> GetListAsync(BannerType? type)
        {
            if (type == null || type == BannerType.DEFAULT)
            {
                return await _context.Banners.OrderByDescending(x => x.Id).ToListAsync();
            }
            return await _context.Banners.Where(x => x.Type == type).OrderByDescending(x => x.Id).ToListAsync();
        }

        public async Task<IEnumerable<Banner>> GetListAsync(long id) => await _context.Banners.Where(x => x.DisplayOn == id).ToListAsync();

        public async Task RemoveRangeAsync(long id)
        {
            var banners = await _context.Banners.Where(x => x.DisplayOn == id).ToListAsync();
            if (banners.Count() > 0)
            {
                _context.RemoveRange(banners);
                await _context.SaveChangesAsync();
            }
        }
    }
}
