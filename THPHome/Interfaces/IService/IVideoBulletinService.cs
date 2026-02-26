using THPCore.Models;
using THPHome.Models.Args.Departments;
using THPHome.Models.Args.VideoBulletin;
using THPHome.Models.Filters.VideoBulletin;

namespace THPHome.Interfaces.IService;

public interface IVideoBulletinService
{
    Task<ListResult<object>> ListAsync(VideoBulletinFilterOptions filterOptions);
    Task<THPResult> CreateAsync(VideoBulletinCreateArgs args);
    Task<THPResult> UpdateAsync(VideoBulletinUpdateArgs args);
    Task<THPResult> DeleteAsync(int id);
}

