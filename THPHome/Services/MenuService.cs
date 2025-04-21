using Microsoft.EntityFrameworkCore;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Models.Payload;
using THPHome.ViewModels;

namespace THPHome.Services;

public class MenuService(IMenuRepository _menuRepository, ApplicationDbContext _context) : IMenuService
{
    public async Task<THPResult> AddAsync(Menu menu)
    {
        await _menuRepository.AddAsync(menu);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsyn(int id)
    {
        var menu = await _menuRepository.GetByIdAsync(id);
        if (menu is null) return THPResult.Failed("Không tìm thấy danh mục!");
        await _menuRepository.DeleteAsync(menu);
        return THPResult.Success;
    }

    public Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload) => _menuRepository.GetListAsync(payload);

    public async Task<object> GetListAsync(MenuFilterOptions filterOptions)
    {
        var menus = await _context.Menus.Where(x => x.Locale == filterOptions.Locale)
            .Where(x => x.Type == filterOptions.Type)
            .AsNoTracking().ToListAsync();

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

    public async Task<THPResult> UpdateAsync(Menu menu)
    {
        await _menuRepository.UpdateAsync(menu);
        return THPResult.Success;
    }
}
