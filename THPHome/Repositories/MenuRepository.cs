using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.ViewModels;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories.Base;
using THPHome.Entities;
using THPHome.Models.Payload;

namespace THPHome.Repositories;

public class MenuRepository(ApplicationDbContext context) : EfRepository<Menu>(context), IMenuRepository
{
    public async Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload)
    {
        var menus = await _context.Menus
            .Where(x => x.Locale == payload.Locale && x.Type == payload.Type && x.ParentId == payload.ParentId)
            .Select(x => new MenuViewModel
            {
                Url = x.Url,
                ParentId = x.ParentId,
                CreatedBy = x.CreatedBy,
                CreatedDate = x.CreatedDate,
                Description = x.Description,
                Icon = x.Icon,
                Index = x.Index,
                Locale = x.Locale,
                Mode = x.Mode,
                ModifiedBy = x.ModifiedBy,
                ModifiedDate = x.ModifiedDate,
                Name = x.Name,
                Status = x.Status,
                Type = x.Type,
                Id = x.Id
            })
            .OrderBy(x => x.Index)
            .ToListAsync();
        foreach (var item in menus)
        {
            if (await _context.Menus.AnyAsync(x => x.ParentId == item.Id))
            {
                item.Children = await GetListAsync(new ListMenuPayload
                {
                    Type = item.Type,
                    ParentId = item.Id,
                    Locale = item.Locale
                });
            }

        }
        return menus;
    }

    public async Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type)
    {
        if (type == null)
        {
            return new List<Menu>();
        }
        return await _context.Menus.Where(x => x.ParentId == 0 && x.Type == type).OrderBy(x => x.Name).ToListAsync();
    }
}
