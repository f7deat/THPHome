using THPCore.Models;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;
using THPHome.Services.Users.Models;

namespace THPHome.Interfaces.IService;

public interface IUserService
{
    Task<object?> GetLecturerPublicInfoAsync(string userName);
    Task<object?> ListLecturerAsync(UserFilterOptions filterOptions);
    Task<object?> ListNotificationAsync(FilterOptions filterOptions);
    Task<ListResult<StaffListItem>> ListStaffAsync(UserFilterOptions filterOptions);
}
