using Infrastructure;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace WebUI.ViewComponents;

public class BannerBlockViewComponent : BaseViewComponent<BannerBlock>
{
    public BannerBlockViewComponent(ApplicationDbContext context) : base(context)
    {
    }
}
