using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Constants;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Models.Payload;
using THPHome.ViewModels;
using THPIdentity.Entities;

namespace THPHome.Services;

public class MenuService(IMenuRepository _menuRepository, ApplicationDbContext _context, IHCAService _hcaService, UserManager<ApplicationUser> _userManager) : IMenuService
{
    public async Task<THPResult> AddAsync(Menu menu)
    {
        if (!_hcaService.IsUserInAnyRole(RoleName.Admin, RoleName.Editor))
        {
            var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
            if (user is null) return THPResult.Failed("Người dùng không tồn tại");
            menu.DepartmentId = user.DepartmentId;
        }
        menu.CreatedBy = _hcaService.GetUserName();
        menu.CreatedDate = DateTime.Now;
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
        var query = _context.Menus.Where(x => x.Locale == filterOptions.Locale).Where(x => x.Type == filterOptions.Type).AsNoTracking();
        if (filterOptions.DepartmentId != null)
        {
            query = query.Where(x => x.DepartmentId == filterOptions.DepartmentId);
        }
        else
        {
            query = query.Where(x => x.DepartmentId == null);
        }

        var menus = await query.ToListAsync();

        var parents = menus.Where(x => x.ParentId == null).Select(x => new MenuViewModel
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
                var level2 = childs.Select(x =>
                {
                    return new MenuViewModel
                    {
                        Url = x.Url,
                        ParentId = x.ParentId,
                        CreatedBy = x.CreatedBy,
                        CreatedDate = x.CreatedDate,
                        Description = x.Description,
                        Icon = x.Icon,
                        Index = x.Index,
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
                            Mode = x.Mode,
                            ModifiedBy = x.ModifiedBy,
                            ModifiedDate = x.ModifiedDate,
                            Name = x.Name,
                            Status = x.Status,
                            Type = x.Type,
                            Id = x.Id
                        })
                    };
                }).OrderBy(x => x.Index);

                if (level2.Any())
                {
                    item.Children = level2;
                }
            }
            data.Add(item);
        }

        return new
        {
            data,
            total = parents.Count,
        };
    }

    public Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type) => _menuRepository.GetListParrentAsync(type);

    public async Task<THPResult> UpdateAsync(Menu menu)
    {
        if (menu.ParentId != null)
        {
            if (await _menuRepository.IsExistAsycn(menu.ParentId)) return THPResult.Failed("Menu cha không tồn tại!");
        }
        var data = await _context.Menus.FindAsync(menu.Id);
        if (data is null) return THPResult.Failed("Data not found!");
        data.ModifiedBy = _hcaService.GetUserName();
        data.ModifiedDate = DateTime.Now;
        data.Name = menu.Name;
        data.Description = menu.Description;
        data.Icon = menu.Icon;
        data.ParentId = menu.ParentId;
        data.Index = menu.Index;
        data.Url = menu.Url ?? "#";
        data.Mode = menu.Mode;
        await _menuRepository.UpdateAsync(data);
        return THPResult.Success;
    }
}
