using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        public async Task<dynamic> AddAsync(Comment comment)
        {
            comment.CreatedDate = DateTime.Now;
            comment.ModifiedDate = DateTime.Now;
            await _commentRepository.AddAsync(comment);
            return new
            {
                succeeded = true,
                data = comment
            };
        }

        public async Task<dynamic> ChangeStatusAsync(Comment comment)
        {
            await _commentRepository.UpdateAsync(comment);
            return new { succeeded = true, data = comment};
        }

        public async Task<dynamic> DeleteAsync(Guid id)
        {
            var comment = await _commentRepository.FindAsync(id);
            await _commentRepository.DeleteAsync(comment);
            return new
            {
                succeeded = true,
                data = comment,
                message = "Thành công!"
            };
        }

        public Task<int> GetCountInUserAsync(string id) => _commentRepository.GetCountInUserAsync(id);

        public Task<IReadOnlyList<Comment>> GetListAsync() => _commentRepository.ListAllAsync();

        public Task<IEnumerable<CommentInPost>> GetListInPostAsync(long postId) => _commentRepository.GetListInPostAsync(postId);
    }
}
