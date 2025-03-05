using ApplicationCore.Helpers;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Models.Categories;

namespace THPHome.Interfaces.IService;

public interface ICategoryService
{
    Task<IReadOnlyList<Category>> ListAllAsync(string? locale);
    Task<Category?> GetCategory(int id);
    Task<IReadOnlyList<Category>> CategoriesByType(int pageSize);
    Task<PaginatedList<Category>> ListParrentAsync(int? parrentId, int current, int pageSize);
    Task<Category?> FindAsync(int id);
    Task<IEnumerable<Category>> GetListAsyc(int id, string lang);
    Task<IEnumerable<Category>> GetChildCategoriesAsync(int parentId);
    Task<THPResult> AddAsync(Category category, string locale);
    Task<dynamic> DeleteAsync(int id);
    Task<Category?> GetParentAsync(int categoryId);
    Task<List<Category>> GetListInPostAsync(long postId);
    Task<dynamic> UpdateAsync(Category category);
    Task<List<GroupCategory>> GetGroupCategories(string language);
}
