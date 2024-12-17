using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;

namespace Infrastructure.Repositories
{
    public class AttachmentRepository : EfRepository<Attachment>, IAttachmentRepository
    {
        public AttachmentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Attachment>> GetListInPostAsync(long id)
        {
            return await _context.Attachments.Where(x => x.PostId == id).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task RemoveRangeAsync(List<Attachment> listData)
        {
            _context.Attachments.RemoveRange(listData);
            await _context.SaveChangesAsync();
        }
    }
}
