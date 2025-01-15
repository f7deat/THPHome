using ApplicationCore.Entities;
using THPHome.Interfaces.Base;

namespace THPHome.Interfaces.IRepository;

public interface IPostCategoryRepository : IAsyncRepository<PostCategory>
{
    Task<List<PostCategory>> GetListInPostAsync(long id);
    Task RemoveRangeAsync(List<PostCategory> postCategories);
    Task<int[]> GetListCategoryIdInPostAsync(long postId);
}
