using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace THPHome.ViewComponents;

public class PopupBlockViewComponent : BaseViewComponent<PopupBlock>
{
    public PopupBlockViewComponent(ApplicationDbContext context) : base(context)
    {
    }
}