using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Models.Filters;
using ApplicationCore.Models.Posts;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IPostService
    {
        Task<IEnumerable<Post>> GetListAsync(PostType type);
        Task<PaginatedList<PostView>> GetListAsync(int pageIndex);
        Task<dynamic> GetListAsync(PostFilterOptions filterOptions);
        Task<int> GetTotalViewAsync();
        Task<IEnumerable<Post>> GetTopViewAsync(int pageSize);
        Task<IEnumerable<PostView>> GetListInTagAsync(string tagName, int pageSize);
        Task<IEnumerable<Post>> GetInCategoryAsync(int id);
        Task<int> GetTotalAsync();
        Task<dynamic> GetDataBarChartAsync();
        Task<byte[]> ExportAsync();
        Task<dynamic> ImportAsync(IFormFile file);
        Task<Post> AddAsync(Post post);
        Task<dynamic> SetStatusAsync(Post post);
        Task<dynamic> RemoveAsync(long id);
        Task<Post> FindAsync(long id);
        Task<IEnumerable<PostView>> GetListRandomAsync(int pageSize, int categoryId = 0);
        Task<PaginatedList<PostView>> SearchAsync(string searchTerm, int? categoryId, int pageIndex, int pageSize);
        Task<List<CategoryWithPost>> GetListByAllCategoryAsync();
        Task<dynamic> EditAsync(Post post);
        Task<int> IncreaseViewAsync(Post post);
        Task<PaginatedList<PostView>> GetListInCategoryAsync(int categoryId, string searchTerm, int pageIndex);
        Task<int> GetCountInUserAsync(string id);
        Task<PaginatedList<PostView>> GetListInTagSync(string name, string searchTerm);
        Task<IEnumerable<PostView>> GetListByTypeAsync(PostType type, int pageIndex, int pageSize);
        Task<IEnumerable<PostView>> GetRandomPostsAsync();
        Task<IEnumerable<Post>> GetListPopularAsync();
        Task<IEnumerable<Post>> GetListByUserAsync(string id);
        Task<IEnumerable<PostView>> GetLastedListAsync(int pageSize);
        Task<IEnumerable<Post>> GetRelatedListAsync(string keyword, int pageSize);
        Task<IEnumerable<PostView>> GetListByCategoryAsync(string normalizeName, int pageIndex, int pageSize);
        Task<dynamic> SetActiveAsync(long id);
    }
}
