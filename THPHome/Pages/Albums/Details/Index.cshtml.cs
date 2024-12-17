using ApplicationCore.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Drawing2D;
using THPHome.Data;
using WebUI.Entities;
using WebUI.Foundations;

namespace WebUI.Pages.Albums.Details;

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
