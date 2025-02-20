using ApplicationCore.Helpers;
using ApplicationCore.Enums;
using ApplicationCore.Models.Posts;
using WebUI.Models.ViewModel;
using THPHome.Entities;
using THPHome.Interfaces.Base;
using THPHome.Models.Categories;
using THPHome.Models.Filters;

namespace THPHome.Interfaces.IRepository
{
    public interface IPostRepository : IAsyncRepository<Post>
    {
        Task<PaginatedList<Post>> GetListPostByTagIdAsync(int tagId, int current, int pageSize);
        Task<int> GetTotalViewAsync();
        Task<IEnumerable<Post>> GetTopViewAsync(int pageSize);
        Task<dynamic?> GetDataBarChartAsync();
        Task<dynamic?> GetListAsync(PostFilterOptions filterOptions);
        Task<ListResult<dynamic>> GetInCategoryAsync(PostInCategoryFilterOptions filterOptions);
        Task<bool> IsExistInCategory(int id);
        Task<dynamic> AddRangeAsync(List<Post> posts);
        Task<dynamic> SetStatusAsync(Post post);
        Task<int> IncreaseViewAsync(Post post);
        IQueryable<PostView> GetListInCategory(int categoryId, string searchTerm);
        Task<IEnumerable<PostView>> GetListRandomAsync(int pageSize, int categoryId);
        Task<IEnumerable<Post>> GetListAsync(PostType type);
        Task<int> GetCountInUserAsync(string id);
        Task<PaginatedList<PostView>> GetPostsInTagSync(string name, string searchTerm);
        Task<IEnumerable<PostView>> GetRandomPostsAsync();
        Task<PaginatedList<PostView>> GetListAsync(int current);
        Task<IEnumerable<Post>> GetListPopularAsync();
        Task<IEnumerable<Post>> GetListByUserAsync(string id);
        Task<IEnumerable<PostView>> GetListInTagAsync(string tagName, int pageSize);
        Task<IEnumerable<PostView>> GetLastedListAsync(int pageSize);
        Task<IEnumerable<Post>> GetRelatedListAsync(string keyword, int pageSize);
        Task<PaginatedList<PostView>> SearchAsync(string searchTerm, int? categoryId, int current, int pageSize);
        Task<IEnumerable<PostView>> GetListByCategoryAsync(string normalizeName, int current, int pageSize);
        Task<List<CategoryWithPost>> GetListByAllCategoryAsync();
        Task<IEnumerable<PostView>> GetListByTypeAsync(PostType type, int current, int pageSize, Language language);
        Task<Post> EnsureDataAsync(string url, PostType pAGE, Language language, string locale);
    }
}
