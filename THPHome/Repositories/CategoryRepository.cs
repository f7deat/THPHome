using ApplicationCore.Models.Posts;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Models.Categories;
using THPHome.Repositories.Base;

namespace THPHome.Repositories;

public class CategoryRepository(ApplicationDbContext context) : EfRepository<Category>(context), ICategoryRepository
{
    public async Task<IReadOnlyList<Category>> CategoriesByType(int pageSize) => await _context.Categories.Take(pageSize).ToListAsync();

    public async Task<IEnumerable<Category>> GetChildAsync(int parentId) => await _context.Categories.Where(x => x.ParentId == parentId).ToListAsync();

    public async Task<List<GroupCategory>> GetGroupCategories(string locale)
    {
        var returnValue = new List<GroupCategory>();
        var parrents = await _context.Categories
            .Where(x => x.Locale == locale)
            .Where(x => (x.ParentId == null || x.ParentId < 1) && x.IsDisplayOnHome == true).ToListAsync();
        foreach (var item in parrents)
        {
            var childs = await _context.Categories
                .Where(x => x.Locale == locale)
                .Where(x => x.ParentId == item.Id && x.IsDisplayOnHome == true).ToListAsync();
            returnValue.Add(new GroupCategory
            {
                Id = item.Id,
                Name = item.Name,
                Icon = item.Icon,
                Childs = childs
            });
        }
        return returnValue;
    }

    public async Task<IEnumerable<Category>> GetListAsyc(int id, string locale)
    {
        if (id == 0)
            return await _context.Categories.Where(x => x.ParentId == null || x.ParentId == -1)
                    .Where(x => x.Locale == locale)
                    .ToListAsync();
        else
            return await _context.Categories.Where(x => x.ParentId == id)
                    .Where(x => x.Locale == locale)
                    .ToListAsync();
    }

    public async Task<List<Category>> GetListInPostAsync(long postId)
    {
        return await (from a in _context.Posts.Where(x => x.Id == postId)
                      join b in _context.Categories on a.CategoryId equals b.Id
                      select b).ToListAsync();
    }

    public async Task<Category?> GetParrentAsync(int categoryId) => await _context.Categories.FindAsync(categoryId);

    public async Task<IEnumerable<PostView>> GetRandomPostsAsync(int categoryId, int pageSize)
    {
        return await _context.Posts.Where(x => x.Id == categoryId).OrderBy(x => Guid.NewGuid()).Select(x => new PostView
        {
            Id = x.Id,
            ModifiedDate = x.ModifiedDate,
            Thumbnail = x.Thumbnail,
            Title = x.Title,
            Url = x.Url,
            View = x.View
        }).Take(pageSize).ToListAsync();
    }

    public async Task<bool> IsExistAsync(string name) => await _context.Categories.AnyAsync(x => !string.IsNullOrEmpty(x.NormalizeName) && x.NormalizeName.ToLower() == name);

    public async Task<IReadOnlyList<Category>> ListAllAsync(string? locale) => await _context.Categories.Where(x => x.Locale == locale)
            .OrderBy(x => x.Index)
            .ToListAsync();

    public IQueryable<Category> ListByParrentId(int? parrentId) => _context.Categories.Where(x => x.ParentId == parrentId);
}
