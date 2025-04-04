using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Enums;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;

namespace THPHome.Services;

public class GalleryService(ApplicationDbContext _context) : IGalleryService
{
    public async Task<List<GalleryListResponse>> GalleryListAsync(GalleryFilterOptions filterOptions)
    {
        try
        {
            var query = from a in _context.Posts
                        where a.Type == PostType.GALLERY && a.Locale == filterOptions.Locale
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
