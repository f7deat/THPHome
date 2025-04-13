using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPHome.Data;
using THPHome.Enums;
using THPIdentity.Entities;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;

namespace THPHome.Services;

public class GalleryService(ApplicationDbContext _context, IHCAService _hcaService, UserManager<ApplicationUser> _userManager) : IGalleryService
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
            var userId = _hcaService.GetUserId();
            if (!string.IsNullOrEmpty(userId))
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null) return [];
                query = query.Where(x => x.DepartmentId == user.DepartmentId);
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
