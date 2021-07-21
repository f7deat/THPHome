using ApplicationCore.Entities;
using ApplicationCore.Models.Posts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface ICommentService
    {
        Task<dynamic> AddAsync(Comment comment);
        Task<IEnumerable<CommentInPost>> GetListInPostAsync(long postId);
        Task<IReadOnlyList<Comment>> GetListAsync();
        Task<dynamic> DeleteAsync(Guid id);
        Task<dynamic> ChangeStatusAsync(Comment status);
        Task<int> GetCountInUserAsync(string id);
    }
}
