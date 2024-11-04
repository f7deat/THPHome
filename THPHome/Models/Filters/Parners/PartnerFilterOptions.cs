using ApplicationCore.Entities;
using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.Parners;

public class PartnerFilterOptions : FilterOptions
{
    public string? Name { get; set; }
    public ParnerStatus? Status { get; set; }
}
