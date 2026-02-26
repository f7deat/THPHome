using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Models.Args.Departments;
using THPHome.Models.Args.VideoBulletin;
using THPHome.Models.Filters.VideoBulletin;

namespace THPHome.Interfaces.IRepository
{
    public interface IVideoBulletinRepository : IAsyncRepository<VideoBulletin>
    {
        Task<int> AddRangeAsync(List<VideoBulletin> depts);
        Task<bool> ExistCreateDataAsync(VideoBulletinCreateArgs dept);
        Task<bool> ExistUpdateDataAsync(VideoBulletinUpdateArgs args);
        Task<ListResult<object>> ListAsync(VideoBulletinFilterOptions filterOptions);
    }
}
