using ApplicationCore.Entities;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Helpers;
using System.Collections.Generic;
using ApplicationCore.Enums;
using ApplicationCore.Models.Posts;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IPostRepository : IAsyncRepository<Post>
    {
        Task<PaginatedList<Post>> GetListPostByTagIdAsync(int tagId, int pageIndex, int pageSize);
        Task<int> GetTotalViewAsync();
        Task<IEnumerable<Post>> GetTopViewAsync(int pageSize);
        Task<dynamic> GetDataBarChartAsync();
        Task<dynamic> GetListAsync(int pageIndex, int pageSize, string searchTerm);
        Task<IEnumerable<Post>> GetInCategoryAsync(int id);
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
        Task<PaginatedList<PostView>> GetListAsync(int pageIndex);
        Task<IEnumerable<Post>> GetListPopularAsync();
        Task<IEnumerable<Post>> GetListByUserAsync(string id);
        Task<IEnumerable<PostView>> GetListInTagAsync(string tagName, int pageSize);
        Task<IEnumerable<PostView>> GetLastedListAsync(int pageSize);
        Task<IEnumerable<Post>> GetRelatedListAsync(string keyword, int pageSize);
        Task<PaginatedList<PostView>> SearchAsync(string searchTerm, int? categoryId, int pageIndex, int pageSize);
        Task<IEnumerable<PostView>> GetListByCategoryAsync(string normalizeName, int pageIndex, int pageSize);
        Task<List<IGrouping<string, PostView>>> GetListByAllCategoryAsync();
    }
}
