using THPCore.Models;
using THPHome.Entities.Users;

namespace THPHome.Interfaces.IService.IUsers;

public interface IBookService
{
    Task<THPResult> AddAsync(Book args);
    Task<THPResult> DeleteAsync(Guid id);
    Task<THPResult> UpdateAsync(Book args);
}
