using ApplicationCore.Entities;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Models;
using ApplicationCore.Models.Categories;
using ApplicationCore.Models.Posts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CategoryRepository : EfRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IReadOnlyList<Category>> CategoriesByType(int pageSize)
        {
            return await _context.Categories.Take(pageSize).ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetChildAsync(int parentId)
        {
            try
            {
                return await _context.Categories.Where(x => x.ParrentId == parentId).ToListAsync();
            }
            catch (Exception)
            {
                return default;
            }
        }

        public async Task<List<GroupCategory>> GetGroupCategories()
        {
            var returnValue = new List<GroupCategory>();
            var parrents = await _context.Categories.Where(x => (x.ParrentId == null || x.ParrentId < 1) && x.IsDisplayOnHome == true).ToListAsync();
            foreach (var item in parrents)
            {
                var childs = await _context.Categories.Where(x => x.ParrentId == item.Id && x.IsDisplayOnHome == true).ToListAsync();
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

        public async Task<IEnumerable<Category>> GetListAsyc(int id) {
            if (id == 0)
            return await _context.Categories.Where(x => x.ParrentId == null || x.ParrentId == -1).ToListAsync();
            else
            return await _context.Categories.Where(x => x.ParrentId == id).ToListAsync();
        }

        public async Task<List<Category>> GetListInPostAsync(long postId)
        {
            return await (from a in _context.PostCategories.Where(x => x.PostId == postId)
                        join b in _context.Categories on a.CategoryId equals b.Id
                        select b).ToListAsync();
        }

        public async Task<Category> GetParrentAsync(int categoryId)
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

        public async Task<bool> IsExistAsync(string name) => await _context.Categories.AnyAsync(x => x.NormalizeName.ToLower() == name || x.Name.ToLower() == name);

        public IQueryable<Category> ListByParrentId(int? parrentId) => _context.Categories.Where(x => x.ParrentId == parrentId);
    }
}
