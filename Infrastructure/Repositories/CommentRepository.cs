using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Models.Posts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CommentRepository : EfRepository<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {
            
        }

        public async Task<int> GetCountInUserAsync(string id) => await _context.Comments.CountAsync(x => x.CreatedBy == id);

        public async Task<IEnumerable<CommentInPost>> GetListInPostAsync(long postId)
        {
            var query = from a in _context.Comments.Where(x => x.PostId == postId)
                        join b in _context.Users on a.CreatedBy equals b.Id
                        orderby a.CreatedDate descending
                        select new CommentInPost
                        {
                            CommentId = a.Id,
                            Content = a.Content,
                            DisLiked = a.Dislike,
                            Liked = a.Like,
                            UserName = b.UserName,
                            CreatedDate = a.CreatedDate,
                            ModifiedDate = a.ModifiedDate,
                            ParrentId = a.ParrentId
                        };
            return await query.ToListAsync();
        }
    }
}
