using ApplicationCore.Models.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Models.Payload;
using THPHome.ViewModels;

namespace THPHome.Services;

public class MenuService(IMenuRepository _menuRepository, ApplicationDbContext _context) : IMenuService
{
    public async Task<object> AddAsync(Menu menu)
    {
        return new
        {
            succeeded = true,
            data = await _menuRepository.AddAsync(menu),
            message = "Thành công!"
        };
    }

    public async Task<object> DeleteAsyn(int id)
    {
        var menu = await _menuRepository.GetByIdAsync(id);
        if (menu is null) return new { succeeded = false };
        await _menuRepository.DeleteAsync(menu);
        return new
        {
            succeeded = true,
            data = menu,
            message = "Thành công!"
        };
    }

    public Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload) => _menuRepository.GetListAsync(payload);

    public async Task<object> GetListAsync(FilterOptions filterOptions)
    {
        var menus = await _context.Menus.Where(x => x.Locale == filterOptions.Locale && (x.Type == MenuType.MAIN || x.Type == MenuType.DEFAULT)).AsNoTracking().ToListAsync();

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
                })
                .OrderBy(x => x.Index).ToList();

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

        return new {
            data,
            total = parents.Count,
        };
    }

    public Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type) => _menuRepository.GetListParrentAsync(type);

    public async Task<object> UpdateAsync(Menu menu)
    {
        return new
        {
            succeeded = true,
            data = await _menuRepository.UpdateAsync(menu),
            message = "Thành công!"
        };
    }
}
