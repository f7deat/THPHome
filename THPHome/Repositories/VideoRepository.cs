using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class VideoRepository : EfRepository<Video>, IVideoRepository
    {
        public VideoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<Video>> GetListAsync(int pageSize)
        {
            if (pageSize == 0)
            {
                return await _context.Videos.OrderByDescending(x => x.Id).ToListAsync();
            }
            return await _context.Videos.OrderByDescending(x => x.Id).Take(pageSize).ToListAsync();
        }
    }
}
