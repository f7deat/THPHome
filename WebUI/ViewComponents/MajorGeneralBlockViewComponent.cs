using Infrastructure;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class MajorGeneralBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<MajorGeneralBlock>(context)
{
}
