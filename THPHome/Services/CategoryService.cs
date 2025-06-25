using ApplicationCore.Helpers;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Identity;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Models.Categories;
using THPIdentity.Constants;
using THPIdentity.Entities;

namespace THPHome.Services;

public class CategoryService(ICategoryRepository _categoryRepository, IPostRepository _postRepository, IHCAService _hcaService, UserManager<ApplicationUser> _userManager) : ICategoryService
{
    public async Task<THPResult> AddAsync(Category category, string locale)
    {
        if (string.IsNullOrEmpty(category.NormalizeName))
        {
            category.NormalizeName = SeoHelper.ToSeoFriendly(category.Name);
        }
        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return THPResult.Failed("Người dùng không tồn tại");
        if (!_hcaService.IsUserInAnyRole(RoleName.EDITOR, RoleName.ADMIN))
        {
            category.DepartmentId = user.DepartmentId;
        }
        if (await _categoryRepository.IsExistAsync(category.NormalizeName.ToLower(), category.DepartmentId)) return THPResult.Failed("Danh mục đã tồn tại");
        category.Locale = locale;
        await _categoryRepository.AddAsync(category);
        return THPResult.Success;
    }

    public Task<IReadOnlyList<Category>> CategoriesByType(int pageSize) => _categoryRepository.CategoriesByType(pageSize);

    public async Task<dynamic> DeleteAsync(int id)
    {
        if (await _postRepository.IsExistInCategory(id))
        {
            return new { succeeded = false, message = $"Không thể xóa danh mục đã có bài viết" };
        }
        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return new { succeeded = false, message = "Người dùng không tồn tại" };
        if (!_hcaService.IsUserInAnyRole(RoleName.ADMIN, RoleName.EDITOR))
        {
            if (user.UserType != UserType.Dean) return new { succeeded = false, message = "Bạn không có quyền xóa danh mục" };
        }
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category is null) return new { succeeded = false };
        await _categoryRepository.DeleteAsync(category);
        return new { succeeded = true };
    }

    public Task<Category?> FindAsync(int id) => _categoryRepository.GetByIdAsync(id);

    public Task<Category?> GetCategory(int id) => _categoryRepository.GetByIdAsync(id);

    public Task<IEnumerable<Category>> GetChildCategoriesAsync(int parentId) => _categoryRepository.GetChildAsync(parentId);

    public Task<List<GroupCategory>> GetGroupCategories(string locale) => _categoryRepository.GetGroupCategories(locale);

    public Task<IEnumerable<Category>> GetListAsyc(int id, string lang) => _categoryRepository.GetListAsyc(id, lang);

    public Task<List<Category>> GetListInPostAsync(long postId) => _categoryRepository.GetListInPostAsync(postId);

    public Task<Category?> GetParentAsync(int categoryId) => _categoryRepository.GetParrentAsync(categoryId);

    public Task<IReadOnlyList<Category>> ListAllAsync(string? locale) => _categoryRepository.ListAllAsync(locale);

    public Task<IReadOnlyList<Category>> ListAsync(ISpecification<Category> spec) => _categoryRepository.ListAsync(spec);

    public async Task<PaginatedList<Category>> ListParrentAsync(int? parentId, int current, int pageSize) => await PaginatedList<Category>.CreateAsync(_categoryRepository.ListByParrentId(parentId), current, pageSize);

    public async Task<dynamic> UpdateAsync(Category category)
    {
        await _categoryRepository.UpdateAsync(category);
        return new { succeeded = true, message = "succeeded!" };
    }
}
