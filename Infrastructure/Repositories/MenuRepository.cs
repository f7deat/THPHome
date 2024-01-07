using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Enums;

namespace Infrastructure.Repositories
{
    public class MenuRepository : EfRepository<Menu>, IMenuRepository
    {
        public MenuRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<Menu>> GetListAsync(Language language, MenuType type) => await _context.Menus
            .Where(x => x.Language == language)
            .Where(x => x.Type == type || type == MenuType.DEFAULT).OrderBy(x => x.Index).ToListAsync();

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
