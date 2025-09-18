using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Repositories.Users;

namespace THPHome.Services.Users;

public class JournalService(IJournalRepository _journalRepository, ILogService _logService, IHCAService _hcaService) : IJournalService
{
    public async Task<THPResult> AddAsync(Journal args)
    {
        await _journalRepository.AddAsync(args);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var journal = await _journalRepository.FindAsync(id);
        if (journal is null) return THPResult.Failed("Journal not found");
        await _logService.AddAsync($"Xóa tạp chí / bài báo {journal.Name}.");
        await _journalRepository.DeleteAsync(journal);
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(Journal args)
    {
        var journal = await _journalRepository.FindAsync(args.Id);
        if (journal is null) return THPResult.Failed("Journal not found");
        journal.Name = args.Name;
        journal.ISSN = args.ISSN;
        journal.Authors = args.Authors;
        journal.Volume = args.Volume;
        journal.Issue = args.Issue;
        journal.Page = args.Page;
        journal.PublishYear = args.PublishYear;
        await _journalRepository.UpdateAsync(journal);
        return THPResult.Success;
    }
    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var journal = await _journalRepository.FindAsync(id);
        if (journal is null) return THPResult.Failed("Không tìm thấy thông tin về bài báo/tạp chí");
        if (journal.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho bài báo/tạp chí này");
        journal.EvidenceUrl = fileUrl;
        await _journalRepository.UpdateAsync(journal);
        await _logService.AddAsync($"Cập nhật minh chứng cho bài báo/tạp chí {journal.Name}.");
        return THPResult.Success;
    }
}
