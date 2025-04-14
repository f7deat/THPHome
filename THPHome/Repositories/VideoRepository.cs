using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class VideoRepository(ApplicationDbContext context) : EfRepository<Video>(context), IVideoRepository
{
    public async Task<IReadOnlyList<Video>> GetListAsync(int pageSize)
    {
        if (pageSize == 0)
        {
            return await _context.Videos.OrderByDescending(x => x.Id).ToListAsync();
        }
        return await _context.Videos.OrderByDescending(x => x.Id).Take(pageSize).ToListAsync();
    }
}
