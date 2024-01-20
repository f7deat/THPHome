using ApplicationCore.Entities;
using ApplicationCore.Models.Posts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface ICommentRepository : IAsyncRepository<Comment>
    {
        Task<IEnumerable<CommentInPost>> GetListInPostAsync(long postId);
        Task<int> GetCountInUserAsync(string id);
    }
}
