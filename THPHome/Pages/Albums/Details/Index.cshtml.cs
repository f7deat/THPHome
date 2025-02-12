using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using WebUI.Entities;
using WebUI.Foundations;

namespace THPHome.Pages.Albums.Details;

public class IndexModel : DynamicPageModel
{
    public IndexModel(ApplicationDbContext context) : base(context)
    {
    }

    public List<Photo> Photos { get; set; } = [];
    public Gallery? Gallery { get; set; } = new();

    public async Task<IActionResult> OnGetAsync()
    {
        Photos = await _context.Photos.Where(x => x.PostId == PageData.Id).ToListAsync();
        return Page();
    }
}
