using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Helpers;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories.Base;
using WebUI.Models.Filters.Settings;
using WebUI.Models.ViewModel;

namespace THPHome.Repositories;

public class BannerRepository(ApplicationDbContext context) : EfRepository<Banner>(context), IBannerRepository
{
    public async Task<ListResult<Banner>> GetListAsync(BannerFilterOptions filterOptions)
    {
        var language = LanguageHelper.GetLanguage(filterOptions.Locale);
        var query = _context.Banners.Where(x => x.Language == language && x.Type == BannerType.SLIDE);
        query = query.OrderByDescending(x => x.CreatedDate);

        return await ListResult<Banner>.Success(query, filterOptions);
    }

    public async Task RemoveRangeAsync(long id)
    {
        var banners = await _context.Banners.Where(x => x.PostId == id).ToListAsync();
        if (banners.Count != 0)
        {
            _context.RemoveRange(banners);
            await _context.SaveChangesAsync();
        }
    }
}
