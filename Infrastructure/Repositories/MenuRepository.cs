using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class MenuRepository : EfRepository<Menu>, IMenuRepository
    {
        public MenuRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<Menu>> GetListAsync(MenuType type) => await _context.Menus.Where(x => x.Type == type || type == MenuType.DEFAULT).ToListAsync();

        public async Task<IEnumerable<Menu>> GetListParrentAsync() => await _context.Menus.Where(x => x.ParrentId == 0).OrderBy(x => x.Name).ToListAsync();
    }
}
