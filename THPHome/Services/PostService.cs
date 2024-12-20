using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Filters;
using ApplicationCore.Models.Posts;
using THPHome.Entities;
using WebUI.Models.Categories;
using WebUI.Models.ViewModel;

namespace ApplicationCore.Services;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IPostCategoryRepository _postCategoryRepository;
    private readonly IBannerRepository _bannerRepository;

    public PostService(
        IPostRepository postRepository,
        ICategoryRepository categoryRepository,
        IPostCategoryRepository postCategoryRepository,
        IBannerRepository bannerRepository)
    {
        _postRepository = postRepository;
        _categoryRepository = categoryRepository;
        _postCategoryRepository = postCategoryRepository;
        _bannerRepository = bannerRepository;
    }

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
        var postCategories = await _postCategoryRepository.ListAllAsync();
        return await ExcelHelper.ExportProduct(
            posts,
            categories,
            postCategories
            );
    }

    public Task<Post> FindAsync(long id) => _postRepository.FindAsync(id);

    public Task<dynamic?> GetDataBarChartAsync() => _postRepository.GetDataBarChartAsync();

    public Task<ListResult<dynamic>> GetInCategoryAsync(PostInCategoryFilterOptions filterOptions) => _postRepository.GetInCategoryAsync(filterOptions);

    public Task<dynamic> GetListAsync(PostFilterOptions filterOptions) => _postRepository.GetListAsync(filterOptions);

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

    public async Task<dynamic> RemoveAsync(long id)
    {
        var post = await _postRepository.FindAsync(id);
        await _postRepository.DeleteAsync(post);
        var postCategories = await _postCategoryRepository.GetListInPostAsync(id);
        await _postCategoryRepository.RemoveRangeAsync(postCategories);
        await _bannerRepository.RemoveRangeAsync(id);
        return new { succeeded = true };
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

    public Task<IEnumerable<PostView>> GetListByTypeAsync(PostType type, int current, int pageSize, Language language) => _postRepository.GetListByTypeAsync(type, current, pageSize, language);

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

    public async Task<Post> EnsureDataAsync(string url, PostType pAGE, Language locale)
    {
        return await _postRepository.EnsureDataAsync(url, pAGE, locale);
    }
}
