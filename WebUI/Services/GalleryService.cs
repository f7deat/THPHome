using Infrastructure;
using Microsoft.EntityFrameworkCore;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;

namespace WebUI.Services;

public class GalleryService : IGalleryService
{
    private readonly ApplicationDbContext _context;
    public GalleryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<GalleryListResponse>> GalleryListAsync(GalleryFilterOptions filterOptions)
    {
        var query = from a in _context.Galleries
                    select new GalleryListResponse
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        ModifiedDate = a.ModifiedDate,
                        Count = _context.Photos.Count(x => x.GalleryId == a.Id),
                        Thumbnail = _context.Photos.First(x => x.GalleryId == a.Id).Url
                    };
        if (!string.IsNullOrWhiteSpace(filterOptions.Name))
        {
            query = query.Where(x => x.Name.ToLower().Contains(filterOptions.Name.ToLower()));
        }
        query = query.OrderByDescending(x => x.ModifiedDate);
        var result = await query.ToListAsync();
        var uncategory = await _context.Photos.FirstOrDefaultAsync(x => x.GalleryId == Guid.Empty);
        result.Insert(0, new GalleryListResponse
        {
            Name = "Chưa phân loại",
            Id = Guid.Empty,
            Count = await _context.Photos.CountAsync(x => x.GalleryId == Guid.Empty),
            Thumbnail = uncategory?.Url
        });
        return result;
    }
}
