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
        try
        {
            var query = from a in _context.Posts
                        where a.Type == ApplicationCore.Enums.PostType.GALLERY && a.Language == filterOptions.Language
                        select new GalleryListResponse
                        {
                            Id = a.Id,
                            Title = a.Title,
                            Description = a.Description,
                            ModifiedDate = a.ModifiedDate,
                            Count = _context.Photos.Count(x => x.PostId == a.Id),
                            Thumbnail = _context.Photos.First(x => x.PostId == a.Id).Url,
                            Url = a.Url
                        };
            if (!string.IsNullOrWhiteSpace(filterOptions.Name))
            {
                query = query.Where(x => x.Title.ToLower().Contains(filterOptions.Name.ToLower()));
            }
            query = query.OrderByDescending(x => x.ModifiedDate);
            return await query.ToListAsync();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
