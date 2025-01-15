using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.ViewModels;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Models.Payload;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class MenuRepository(ApplicationDbContext context) : EfRepository<Menu>(context), IMenuRepository
{
    public async Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload)
    {
        var menus = await _context.Menus.Where(x => x.Locale == payload.Locale && x.Type == payload.Type).AsNoTracking().ToListAsync();

        var parents = menus.Where(x => x.ParentId == 0 || x.ParentId == null).Select(x => new MenuViewModel
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
        }).OrderBy(x => x.Index).ToList();

        var data = new List<MenuViewModel>();

        foreach (var item in parents)
        {
            var childs = menus.Where(x => x.ParentId == item.Id).ToList();
            if (childs.Count != 0)
            {
                item.Children = childs.Select(x => new MenuViewModel
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
                    Id = x.Id,
                    Children = menus.Where(m => m.ParentId == x.Id).Select(x => new MenuViewModel
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
                })
                .OrderBy(x => x.Index);
            }
            data.Add(item);
        }
        return data;
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
