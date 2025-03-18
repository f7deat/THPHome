using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;

namespace THPHome.Services.Users;

public class JournalService(IJournalRepository _journalRepository, ILogService _logService) : IJournalService
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
        journal.AuthorCount = args.AuthorCount;
        journal.Volume = args.Volume;
        journal.Issue = args.Issue;
        journal.Page = args.Page;
        journal.PublishYear = args.PublishYear;
        await _journalRepository.UpdateAsync(journal);
        return THPResult.Success;
    }
}
