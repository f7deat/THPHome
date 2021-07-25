using ApplicationCore.Entities;
using ApplicationCore.Models.Categories;
using ApplicationCore.Models.Posts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface ICategoryRepository : IAsyncRepository<Category>
    {
        Task<IReadOnlyList<Category>> CategoriesByType(int pageSize);
        IQueryable<Category> ListByParrentId(int? parrentId);
        Task<IEnumerable<Category>> GetChildAsync(int parentId);
        Task<IEnumerable<PostView>> GetRandomPostsAsync(int categoryId, int pageSize);
        Task<Category> GetParrentAsync(int categoryId);
        Task<IEnumerable<Category>> GetListAsyc(int id);
        Task<List<Category>> GetListInPostAsync(long postId);
        Task<bool> IsExistAsync(string normalizeName);
        Task<List<GroupCategory>> GetGroupCategories();
    }
}
