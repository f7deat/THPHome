using THPHome.Data;
using THPHome.Models.Blocks;
using WebUI.Foundations;

namespace WebUI.ViewComponents;

public class TinyMCEBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<TinyMCEBlock>(context)
{
}
