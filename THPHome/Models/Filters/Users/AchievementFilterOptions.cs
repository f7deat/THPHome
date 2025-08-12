using THPCore.Models;

namespace THPHome.Models.Filters.Users;

public class AchievementFilterOptions : FilterOptions
{
    public string? UserName { get; set; }
    public string? Name { get; set; }
}
