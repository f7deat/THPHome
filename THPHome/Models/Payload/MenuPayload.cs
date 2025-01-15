using ApplicationCore.Models.Filters;
using THPHome.Entities;

namespace THPHome.Models.Payload;

public class ListMenuPayload : FilterOptions
{
    public MenuType Type { get; set; }
    public int ParentId { get; set; }
}
