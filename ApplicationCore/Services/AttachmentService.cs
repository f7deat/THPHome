using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class AttachmentService : IAttachmentService
    {
        private readonly IAttachmentRepository _attachmentRepository;
        public AttachmentService(IAttachmentRepository attachmentRepository)
        {
            _attachmentRepository = attachmentRepository;
        }
        public async Task AddAsync(Attachment attachment)
        {
            await _attachmentRepository.AddAsync(attachment);
        }

        public async Task DeleteAsync(Guid id)
        {
            var attach = await _attachmentRepository.FindAsync(id);
            await _attachmentRepository.DeleteAsync(attach);
        }

        public Task<List<Attachment>> GetListInPostAsync(long id)
        {
            return _attachmentRepository.GetListInPostAsync(id);
        }

        public async Task MapAsync(List<Attachment> attachments, long id)
        {
            var listData = await _attachmentRepository.GetListInPostAsync(id);
            if (listData.Count > 0)
            {
                await _attachmentRepository.RemoveRangeAsync(listData);
            }
            if (attachments != null)
            {
                foreach (var item in attachments)
                {
                    var attach = await _attachmentRepository.FindAsync(item.Id);
                    attach.PostId = id;
                }
                await _attachmentRepository.SaveChangesAsync();
            }
        }
    }
}
