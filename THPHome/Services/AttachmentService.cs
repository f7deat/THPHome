using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task<dynamic> DeleteAsync(Guid id)
        {
            try
            {
                var attach = await _attachmentRepository.FindAsync(id);
                var file = $"~/files/{id}{attach.Extension}";
                if (File.Exists(file))
                {
                    File.Delete(file);
                }
                await _attachmentRepository.DeleteAsync(attach);
                return new { succeeded = true, message = "succeeded!" };
            }
            catch (Exception ex)
            {
                return new { succeeded = false, message = ex.ToString() };
            }
        }

        public Task<List<Attachment>> GetListInPostAsync(long id)
        {
            return _attachmentRepository.GetListInPostAsync(id);
        }

        public async Task MapAsync(List<Attachment>? attachments, long id)
        {
            if (attachments is null) return;
            foreach (var item in attachments)
            {
                var attach = await _attachmentRepository.FindAsync(item.Id);
                attach.PostId = id;
            }
            await _attachmentRepository.SaveChangesAsync();
        }
    }
}
