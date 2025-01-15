using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using THPHome.Data;
using THPHome.Repositories.Base;

namespace Infrastructure.Repositories
{
    public class PostCategoryRepository : EfRepository<PostCategory>, IPostCategoryRepository
    {
        public PostCategoryRepository(ApplicationDbContext _context) : base(_context)
        {

        }

        public async Task<int[]> GetListCategoryIdInPostAsync(long postId) => await _context.PostCategories.Where(x => x.PostId == postId).Select(x => x.CategoryId).ToArrayAsync();

        public async Task<List<PostCategory>> GetListInPostAsync(long id) => await _context.PostCategories.Where(x => x.PostId == id).ToListAsync();

        public async Task RemoveRangeAsync(List<PostCategory> postCategories)
        {
            _context.PostCategories.RemoveRange(postCategories);
            await _context.SaveChangesAsync();
        }
    }
}
