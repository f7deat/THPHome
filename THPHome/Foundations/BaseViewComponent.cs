using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using THPHome.Data;
using WebUI.Models.Blocks;

namespace WebUI.Foundations;

public class BaseViewComponent<T>(ApplicationDbContext context) : ViewComponent
{
    protected readonly ApplicationDbContext _context = context;

    public async Task<IViewComponentResult> InvokeAsync(Guid id)
    {
        var block = await _context.PostBlocks.FindAsync(id);
        if (block == null || string.IsNullOrEmpty(block.Data))
        {
            return View("/Pages/Components/EmptyBlock/Default.cshtml", new EmptyBlock());
        }
        var data = JsonConvert.DeserializeObject<T>(block.Data);
        return View(data);
    }
}
