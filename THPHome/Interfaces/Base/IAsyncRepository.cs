using ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace THPHome.Interfaces.Base;

public interface IAsyncRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<T?> FindAsync(long id);
    Task<T?> FindAsync(Guid id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<int> CountAsync(ISpecification<T> spec);
    Task<int> CountAsync();
    Task<int> SaveChangesAsync();
    IDbContextTransaction BeginTransaction();
}
