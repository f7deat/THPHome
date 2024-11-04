using Infrastructure;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class DividerBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<DividerBlock>(context)
{
}
