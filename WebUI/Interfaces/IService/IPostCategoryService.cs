using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IPostCategoryService
    {
        Task AddAsync(int[]? listCategoryId, long postId);
        Task DeleteAsync(long postId);
        Task<int[]> GetListCategoryIdInPostAsync(long postId);
    }
}
