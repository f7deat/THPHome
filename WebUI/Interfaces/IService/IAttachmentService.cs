using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IAttachmentService
    {
        Task AddAsync(Attachment attachment);
        Task<dynamic> DeleteAsync(Guid id);
        Task MapAsync(List<Attachment> attachments, long id);
        Task<List<Attachment>> GetListInPostAsync(long id);
    }
}
