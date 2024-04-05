using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using ApplicationCore.Models.Categories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IPostRepository _postRepository;

        public CategoryService(ICategoryRepository categoryRepository, IPostRepository postRepository)
        {
            _categoryRepository = categoryRepository;
            _postRepository = postRepository;
        }

        public async Task<dynamic> AddAsync(Category category)
        {
            if (string.IsNullOrEmpty(category.NormalizeName))
            {
                category.NormalizeName = SeoHelper.ToSeoFriendly(category.Name);
            }
            if (await _categoryRepository.IsExistAsync(category.NormalizeName.ToLower()) || await _categoryRepository.IsExistAsync(category.Name.ToLower()))
            {
                return new { succeeded = false, message = "Category exists!!!" };
            }
            await _categoryRepository.AddAsync(category);
            return new { succeeded = true, message = "Created Success!!!" };
        }

        public Task<IReadOnlyList<Category>> CategoriesByType(int pageSize) => _categoryRepository.CategoriesByType(pageSize);

        public async Task<dynamic> DeleteAsync(int id)
        {
            if (await _postRepository.IsExistInCategory(id))
            {
                return new { succeeded = false, message = $"Không thể xóa danh mục đã có bài viết" };
            }
            var category = await _categoryRepository.GetByIdAsync(id);
            await _categoryRepository.DeleteAsync(category);
            return new { succeeded = true };
        }

        public Task<Category> FindAsync(int id) => _categoryRepository.GetByIdAsync(id);

        public Task<Category> GetCategory(int id) => _categoryRepository.GetByIdAsync(id);

        public Task<IEnumerable<Category>> GetChildCategoriesAsync(int parentId) => _categoryRepository.GetChildAsync(parentId);

        public Task<List<GroupCategory>> GetGroupCategories(Language language) => _categoryRepository.GetGroupCategories(language);

        public Task<IEnumerable<Category>> GetListAsyc(int id, Language lang) => _categoryRepository.GetListAsyc(id, lang);

        public Task<List<Category>> GetListInPostAsync(long postId) => _categoryRepository.GetListInPostAsync(postId);

        public Task<Category> GetParrentAsync(int categoryId) => _categoryRepository.GetParrentAsync(categoryId);

        public Task<IReadOnlyList<Category>> ListAllAsync(Language lang) => _categoryRepository.ListAllAsync(lang);

        public Task<IReadOnlyList<Category>> ListAsync(ISpecification<Category> spec) => _categoryRepository.ListAsync(spec);

        public async Task<PaginatedList<Category>> ListParrentAsync(int? parrentId, int pageIndex, int pageSize) => await PaginatedList<Category>.CreateAsync(_categoryRepository.ListByParrentId(parrentId), pageIndex, pageSize);

        public async Task<dynamic> UpdateAsync(Category category)
        {
            await _categoryRepository.UpdateAsync(category);
            return new { succeeded = true, message = "succeeded!" };
        }
    }
}
