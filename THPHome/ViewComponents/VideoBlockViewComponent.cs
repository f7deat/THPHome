using Infrastructure;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class VideoBlockViewComponent(ApplicationDbContext context) : BaseViewComponent<VideoBlock>(context)
{
}
