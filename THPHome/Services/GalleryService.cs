using THPCore.Models;
using THPHome.Data;
using THPHome.Enums;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters.Files;
using THPHome.Models.Galleries;

namespace THPHome.Services;

public class GalleryService(ApplicationDbContext _context) : IGalleryService
{
    public async Task<ListResult<GalleryListResponse>> GalleryListAsync(GalleryFilterOptions filterOptions)
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
                        Url = a.Url,
                        DepartmentId = a.DepartmentId,
                        View = a.View
                    };
        if (!string.IsNullOrWhiteSpace(filterOptions.Name))
        {
            query = query.Where(x => x.Title.ToLower().Contains(filterOptions.Name.ToLower()));
        }
        if (filterOptions.DepartmentId != null)
        {
            query = query.Where(x => x.DepartmentId == filterOptions.DepartmentId);
        }
        query = query.OrderByDescending(x => x.ModifiedDate);
        return await ListResult<GalleryListResponse>.Success(query, filterOptions);
    }
}
