using Infrastructure;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class TinyMCEBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<TinyMCEBlock>(context)
{
}
