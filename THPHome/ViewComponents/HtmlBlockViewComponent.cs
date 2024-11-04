using Infrastructure;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class HtmlBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<HtmlBlock>(context)
{
}
