using THPHome.Models.Filters.Users;

namespace THPHome.Interfaces.IService;

public interface IUserService
{
    Task<object?> GetLecturerPublicInfoAsync(string userName);
    Task<object?> ListLecturerAsync(UserFilterOptions filterOptions);
}
