using ApplicationCore.Entities;
using THPHome.Entities;
using THPHome.Models.Filters;

namespace WebUI.Models.Filters.Parners;

public class PartnerFilterOptions : FilterOptions
{
    public string? Name { get; set; }
    public ParnerStatus? Status { get; set; }
}
