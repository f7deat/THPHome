using THPHome.Entities;
using THPHome.Models.Filters;

namespace THPHome.Models.Payload;

public class ListMenuPayload : FilterOptions
{
    public MenuType Type { get; set; }
    public int ParentId { get; set; }
}
