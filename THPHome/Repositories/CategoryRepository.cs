using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Models.Posts;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Models.Categories;

namespace Infrastructure.Repositories;

public class CategoryRepository : EfRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Category>> CategoriesByType(int pageSize)
    {
        return await _context.Categories.Take(pageSize).ToListAsync();
    }

    public async Task<IEnumerable<Category>> GetChildAsync(int parentId) => await _context.Categories.Where(x => x.ParrentId == parentId).ToListAsync();

    public async Task<List<GroupCategory>> GetGroupCategories(Language language)
    {
        var returnValue = new List<GroupCategory>();
        var parrents = await _context.Categories
            .Where(x => x.Language == language)
            .Where(x => (x.ParrentId == null || x.ParrentId < 1) && x.IsDisplayOnHome == true).ToListAsync();
        foreach (var item in parrents)
        {
            var childs = await _context.Categories
                .Where(x => x.Language == language)
                .Where(x => x.ParrentId == item.Id && x.IsDisplayOnHome == true).ToListAsync();
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

    public async Task<IEnumerable<Category>> GetListAsyc(int id, Language lang) {
        if (id == 0)
        return await _context.Categories.Where(x => x.ParrentId == null || x.ParrentId == -1)
                .Where(x => x.Language == lang)
                .ToListAsync();
        else
        return await _context.Categories.Where(x => x.ParrentId == id)
                .Where(x => x.Language == lang)
                .ToListAsync();
    }

    public async Task<List<Category>> GetListInPostAsync(long postId)
    {
        return await (from a in _context.PostCategories.Where(x => x.PostId == postId)
                    join b in _context.Categories on a.CategoryId equals b.Id
                    select b).ToListAsync();
    }

    public async Task<Category?> GetParrentAsync(int categoryId)
    {
        try
        {
            return await _context.Categories.FindAsync(categoryId);
        }
        catch (Exception)
        {
            return default;
        }
    }

    public async Task<IEnumerable<PostView>> GetRandomPostsAsync(int categoryId, int pageSize)
    {
        return await _context.Posts.Where(x => x.Id == categoryId).OrderBy(x => Guid.NewGuid()).Select(x => new PostView { 
            Id = x.Id,
            ModifiedDate = x.ModifiedDate,
            Thumbnail = x.Thumbnail,
            Title = x.Title,
            Url = x.Url,
            View = x.View
        }).Take(pageSize).ToListAsync();
    }

    public async Task<bool> IsExistAsync(string name) => await _context.Categories.AnyAsync(x => !string.IsNullOrEmpty(x.NormalizeName) && x.NormalizeName.ToLower() == name);

    public async Task<IReadOnlyList<Category>> ListAllAsync(Language lang) => await _context.Categories.Where(x => x.Language == lang)
            .OrderBy(x => x.Index)
            .ToListAsync();

    public IQueryable<Category> ListByParrentId(int? parrentId) => _context.Categories.Where(x => x.ParrentId == parrentId);
}
