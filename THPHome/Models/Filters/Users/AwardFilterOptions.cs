using ApplicationCore.Models.Filters;

namespace THPHome.Models.Filters.Users;

public class AwardFilterOptions : FilterOptions
{
    public Guid? UserDetailId { get; set; }
}
