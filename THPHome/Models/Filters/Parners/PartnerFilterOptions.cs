using THPCore.Models;
using THPHome.Entities;

namespace THPHome.Models.Filters.Parners;

public class PartnerFilterOptions : FilterOptions
{
    public string? Name { get; set; }
    public ParnerStatus? Status { get; set; }
}
