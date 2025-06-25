using ApplicationCore.Models.Posts;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.Categories;

namespace THPHome.Interfaces.IRepository;

public interface ICategoryRepository : IAsyncRepository<Category>
{
    Task<IReadOnlyList<Category>> CategoriesByType(int pageSize);
    IQueryable<Category> ListByParrentId(int? parrentId);
    Task<IEnumerable<Category>> GetChildAsync(int parentId);
    Task<IEnumerable<PostView>> GetRandomPostsAsync(int categoryId, int pageSize);
    Task<Category?> GetParrentAsync(int categoryId);
    Task<IEnumerable<Category>> GetListAsyc(int id, string locale);
    Task<List<Category>> GetListInPostAsync(long postId);
    Task<bool> IsExistAsync(string normalizeName, int? departmentId);
    Task<List<GroupCategory>> GetGroupCategories(string locale);
    Task<IReadOnlyList<Category>> ListAllAsync(string? locale);
}
