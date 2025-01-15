using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;

namespace THPHome.Services;

public class AttachmentService(IAttachmentRepository _attachmentRepository) : IAttachmentService
{
    public async Task AddAsync(Attachment attachment)
    {
        await _attachmentRepository.AddAsync(attachment);
    }

    public async Task<dynamic> DeleteAsync(Guid id)
    {
        try
        {
            var attach = await _attachmentRepository.FindAsync(id);
            if (attach is null) return new { succeeded = false, message = "data not found!" };
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
            if (attach is null) continue;
            attach.PostId = id;
        }
        await _attachmentRepository.SaveChangesAsync();
    }
}
