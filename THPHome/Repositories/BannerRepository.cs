using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using THPHome.Data;
using THPHome.Repositories.Base;
using WebUI.Helpers;
using WebUI.Models.Filters.Settings;
using WebUI.Models.ViewModel;

namespace Infrastructure.Repositories;

public class BannerRepository : EfRepository<Banner>, IBannerRepository
{
    public BannerRepository(ApplicationDbContext context) : base(context)
    {

    }

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
        if (banners.Any())
        {
            _context.RemoveRange(banners);
            await _context.SaveChangesAsync();
        }
    }
}
