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
        Task DeleteAsync(Guid id);
    }
}
