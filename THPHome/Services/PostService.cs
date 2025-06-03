using ApplicationCore.Helpers;
using ApplicationCore.Models.Posts;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Enums;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IService;
using THPHome.Models.Categories;
using THPHome.Models.Filters;

namespace THPHome.Services;

public class PostService(IPostRepository _postRepository, ICategoryRepository _categoryRepository, IHCAService _hcaService) : IPostService
{
    public async Task<Post> AddAsync(Post post)
    {
        post.CreatedDate = DateTime.Now;
        post.View = 0;
        post.Status = PostStatus.DRAFT;
        post.Url = SeoHelper.ToSeoFriendly(post.Title);
        return await _postRepository.AddAsync(post);
    }

    public async Task<dynamic> EditAsync(Post post)
    {
        if (string.IsNullOrWhiteSpace(post.Title))
        {
            return new { succeded = false };
        }
        if (post.Type != PostType.PAGE)
        {
            post.Url = SeoHelper.ToSeoFriendly(post.Title);
        }
        post.Title = post.Title.Trim();
        await _postRepository.UpdateAsync(post);
        return new { succeeded = true };
    }

    public async Task<byte[]> ExportAsync()
    {
        var posts = await _postRepository.ListAllAsync();
        var categories = await _categoryRepository.ListAllAsync();
        return await ExcelHelper.ExportProduct(
            posts,
            categories
            );
    }

    public Task<Post?> FindAsync(long id) => _postRepository.FindAsync(id);

    public Task<dynamic?> GetDataBarChartAsync() => _postRepository.GetDataBarChartAsync();

    public Task<ListResult<dynamic>> GetInCategoryAsync(PostInCategoryFilterOptions filterOptions) => _postRepository.GetInCategoryAsync(filterOptions);

    public Task<dynamic?> GetListAsync(PostFilterOptions filterOptions) => _postRepository.GetListAsync(filterOptions);

    public async Task<PaginatedList<PostView>> GetListInCategoryAsync(int categoryId, string searchTerm, int current) => await PaginatedList<PostView>.CreateAsync(_postRepository.GetListInCategory(categoryId, searchTerm), current, 9);

    public Task<IEnumerable<PostView>> GetListRandomAsync(int pageSize, int categoryId = 0) => _postRepository.GetListRandomAsync(pageSize, categoryId);

    public Task<IEnumerable<Post>> GetListAsync(PostType type) => _postRepository.GetListAsync(type);

    public Task<IEnumerable<Post>> GetTopViewAsync(int pageSize) => _postRepository.GetTopViewAsync(pageSize);

    public Task<int> GetTotalAsync() => _postRepository.CountAsync();

    public Task<int> GetTotalViewAsync() => _postRepository.GetTotalViewAsync();

    public async Task<dynamic> ImportAsync(IFormFile file)
    {
        var posts = ExcelHelper.ImportPost(file);
        return await _postRepository.AddRangeAsync(posts);
    }

    public Task<int> IncreaseViewAsync(Post post) => _postRepository.IncreaseViewAsync(post);

    public async Task<THPResult> RemoveAsync(long id)
    {
        var post = await _postRepository.FindAsync(id);
        if (post is null) return THPResult.Failed("Không tìm thấy bài viết!");
        if (post.IsDeleted) return THPResult.Failed("Bài viết đã được xóa!");
        post.IsDeleted = true;
        post.ModifiedDate = DateTime.Now;
        post.ModifiedBy = _hcaService.GetUserId();
        await _postRepository.UpdateAsync(post);
        return THPResult.Success;
    }

    public Task<dynamic> SetStatusAsync(Post post) => _postRepository.SetStatusAsync(post);

    public Task<int> GetCountInUserAsync(string id) => _postRepository.GetCountInUserAsync(id);

    public Task<PaginatedList<PostView>> GetListInTagSync(string name, string searchTerm) => _postRepository.GetPostsInTagSync(name, searchTerm);

    public Task<IEnumerable<PostView>> GetRandomPostsAsync() => _postRepository.GetRandomPostsAsync();

    public Task<PaginatedList<PostView>> GetListAsync(int current) => _postRepository.GetListAsync(current);

    public Task<IEnumerable<Post>> GetListPopularAsync() => _postRepository.GetListPopularAsync();

    public Task<IEnumerable<Post>> GetListByUserAsync(string id) => _postRepository.GetListByUserAsync(id);

    public Task<IEnumerable<PostView>> GetListInTagAsync(string tagName, int pageSize) => _postRepository.GetListInTagAsync(tagName, pageSize);

    public Task<IEnumerable<PostView>> GetLastedListAsync(int pageSize) => _postRepository.GetLastedListAsync(pageSize);

    public Task<IEnumerable<Post>> GetRelatedListAsync(string keyword, int pageSize) => _postRepository.GetRelatedListAsync(keyword, pageSize);

    public Task<PaginatedList<PostView>> SearchAsync(string searchTerm, int? categoryId, int current, int pageSize) => _postRepository.SearchAsync(searchTerm, categoryId, current, pageSize);

    public Task<IEnumerable<PostView>> GetListByCategoryAsync(string normalizeName, int current, int pageSize) => _postRepository.GetListByCategoryAsync(normalizeName, current, pageSize);

    public Task<List<CategoryWithPost>> GetListByAllCategoryAsync() => _postRepository.GetListByAllCategoryAsync();

    public Task<IEnumerable<PostView>> GetListByTypeAsync(PostType type, int current, int pageSize, string locale) => _postRepository.GetListByTypeAsync(type, current, pageSize, locale);

    public async Task<dynamic> SetActiveAsync(long id)
    {
        var post = await _postRepository.FindAsync(id);
        if (post == null)
        {
            return new { succeeded = false, message = "Data not found!" };
        }
        if (post.Status == PostStatus.PUBLISH)
        {
            post.Status = PostStatus.DRAFT;
        }
        else
        {
            post.Status = PostStatus.PUBLISH;
        }
        await _postRepository.UpdateAsync(post);
        return new { succeeded = true, message = "Thành công!" };
    }

    public Task<Post> EnsureDataAsync(string url, PostType pAGE, string locale) => _postRepository.EnsureDataAsync(url, pAGE, locale);

    public Task<ListResult<object>> GetTrashAsync(TrashedPostFilterOptions filterOptions) => _postRepository.GetTrashAsync(filterOptions);

    public async Task<THPResult> RestoreAsync(long id)
    {
        var post = await _postRepository.FindAsync(id);
        if (post is null) return THPResult.Failed("Không tìm thấy bài viết!");
        post.IsDeleted = false;
        post.ModifiedDate = DateTime.Now;
        post.ModifiedBy = _hcaService.GetUserId();
        await _postRepository.UpdateAsync(post);
        return THPResult.Success;
    }

    public Task<THPResult> DeleteAsync(long id) => _postRepository.DeleteAsync(id);
}
