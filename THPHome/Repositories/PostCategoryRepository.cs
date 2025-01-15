using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class PostCategoryRepository(ApplicationDbContext _context) : EfRepository<PostCategory>(_context), IPostCategoryRepository
{
    public async Task<int[]> GetListCategoryIdInPostAsync(long postId) => await _context.PostCategories.Where(x => x.PostId == postId).Select(x => x.CategoryId).ToArrayAsync();

    public async Task<List<PostCategory>> GetListInPostAsync(long id) => await _context.PostCategories.Where(x => x.PostId == id).ToListAsync();

    public async Task RemoveRangeAsync(List<PostCategory> postCategories)
    {
        _context.PostCategories.RemoveRange(postCategories);
        await _context.SaveChangesAsync();
    }
}
