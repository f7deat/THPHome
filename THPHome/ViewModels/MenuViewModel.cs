using THPHome.Entities;

namespace THPHome.ViewModels;

public class MenuViewModel : Menu
{
    public IEnumerable<MenuViewModel>? Children { get; set; }
}
