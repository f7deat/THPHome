using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using THPHome.Entities;
using THPHome.Models.Categories;

namespace ApplicationCore.Interfaces.IService
{
    public interface ICategoryService
    {
        Task<IReadOnlyList<Category>> ListAllAsync(Language lang);
        Task<Category?> GetCategory(int id);
        Task<IReadOnlyList<Category>> CategoriesByType(int pageSize);
        Task<PaginatedList<Category>> ListParrentAsync(int? parrentId, int current, int pageSize);
        Task<Category?> FindAsync(int id);
        Task<IEnumerable<Category>> GetListAsyc(int id, Language lang);
        Task<IEnumerable<Category>> GetChildCategoriesAsync(int parentId);
        Task<dynamic> AddAsync(Category category);
        Task<dynamic> DeleteAsync(int id);
        Task<Category?> GetParentAsync(int categoryId);
        Task<List<Category>> GetListInPostAsync(long postId);
        Task<dynamic> UpdateAsync(Category category);
        Task<List<GroupCategory>> GetGroupCategories(Language language);
    }
}
