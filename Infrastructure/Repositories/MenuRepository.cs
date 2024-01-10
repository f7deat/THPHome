using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Enums;
using ApplicationCore.Models.Payload;
using ApplicationCore.ViewModels;

namespace Infrastructure.Repositories
{
    public class MenuRepository : EfRepository<Menu>, IMenuRepository
    {
        public MenuRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<MenuViewModel>> GetListAsync(ListMenuPayload payload)
        {
            var menus = await _context.Menus
                .Where(x => x.Language == payload.Language && x.Type == payload.Type && x.ParrentId == payload.ParentId)
                .Select(x => new MenuViewModel
                {
                    Url = x.Url,
                    ParrentId = x.ParrentId,
                    CreatedBy = x.CreatedBy,
                    CreatedDate = x.CreatedDate,
                    Description = x.Description,
                    Icon = x.Icon,
                    Index = x.Index,
                    Language = x.Language,
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
                item.Childs = await GetListAsync(new ListMenuPayload
                {
                    Language = item.Language,
                    Type = item.Type,
                    ParentId = item.Id
                });

            }
            return menus;
        }

        public async Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type)
        {
            if (type == null)
            {
                return new List<Menu>();
            }
            return await _context.Menus.Where(x => x.ParrentId == 0 && x.Type == type).OrderBy(x => x.Name).ToListAsync();
        }
    }
}
