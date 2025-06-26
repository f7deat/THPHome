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
        var query = _context.Menus.Where(x => x.Locale == payload.Locale && x.Type == payload.Type);
        if (payload.DepartmentId != null)
        {
            query = query.Where(x => x.DepartmentId == payload.DepartmentId);
        }
        else
        {
            query = query.Where(x => x.DepartmentId == null);
        }

        query = query.OrderBy(x => x.Index);

        var menus = await query.Select(x => new MenuViewModel
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
        }).ToListAsync();
        var data = menus.Where(x => x.ParentId == 0 || x.ParentId == null).ToList();

        foreach (var item in data)
        {
            item.Children = await GetChildListAsync(menus, menus.Where(x => x.ParentId == item.Id).OrderBy(x => x.Index));
        }
        return data;
    }

    private static async Task<List<MenuViewModel>> GetChildListAsync(List<MenuViewModel> all, IEnumerable<MenuViewModel> parents)
    {
        foreach (var item in parents)
        {
            if (all.Any(x => x.ParentId == item.Id))
            {
                item.Children = await GetChildListAsync(all, all.Where(x => x.ParentId == item.Id).OrderBy(x => x.Index));
            }
        }
        return [.. parents];
    }

    public async Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type)
    {
        if (type == null) return [];
        return await _context.Menus.Where(x => x.ParentId == 0 && x.Type == type).OrderBy(x => x.Name).ToListAsync();
    }

    public async Task<bool> IsExistAsycn(int? parentId) => await _context.Menus.AnyAsync(x => x.Id == parentId);
}
