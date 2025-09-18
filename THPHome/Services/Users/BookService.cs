using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Repositories.Users;

namespace THPHome.Services.Users;

public class BookService(IBookRepository _bookRepository, ILogService _logService, IHCAService _hcaService) : IBookService
{
    public async Task<THPResult> AddAsync(Book args)
    {
        try
        {
            args.CreatedDate = DateTime.Now;
            await _bookRepository.AddAsync(args);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        try
        {
            var book = await _bookRepository.FindAsync(id);
            if (book == null) return THPResult.Failed("Book not found");
            await _logService.AddAsync($"Book {book.Name} deleted");
            await _bookRepository.DeleteAsync(book);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }

    public async Task<THPResult> UpdateAsync(Book args)
    {
        try
        {
            var book = await _bookRepository.FindAsync(args.Id);
            if (book == null) return THPResult.Failed("Book not found");
            book.Name = args.Name;
            book.Authors = args.Authors;
            book.Publisher = args.Publisher;
            book.PublishYear = args.PublishYear;
            book.ISBN = args.ISBN;
            book.Cover = args.Cover;
            await _logService.AddAsync($"Book {book.Name} updated");
            await _bookRepository.UpdateAsync(book);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }
    public async Task<THPResult> UploadCertificateEvidenceAsync(Guid id, string fileUrl)
    {
        var userName = _hcaService.GetUserName();
        var book = await _bookRepository.FindAsync(id);
        if (book is null) return THPResult.Failed("Không tìm thấy thông tin về sách/giáo trình");
        if (book.UserName != userName) return THPResult.Failed("Bạn không có quyền upload minh chứng cho sách/giáo trình này");
        book.EvidenceUrl = fileUrl;
        await _bookRepository.UpdateAsync(book);
        await _logService.AddAsync($"Cập nhật minh chứng cho sách/giáo trình {book.Name}.");
        return THPResult.Success;
    }
}
