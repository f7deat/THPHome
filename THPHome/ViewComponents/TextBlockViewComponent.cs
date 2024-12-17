using THPHome.Data;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class TextBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<TextBlock>(context)
{
}
