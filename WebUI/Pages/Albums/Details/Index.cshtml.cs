using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Drawing2D;
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

    public async Task<IActionResult> OnGetAsync(string normalizedName, long postId)
    {
        Gallery = await _context.Galleries.FirstOrDefaultAsync(x => x.NormalizedName == normalizedName);
        if (Gallery == null) return NotFound();
        ViewData["Title"] = Gallery.Name;
        Photos = await _context.Photos.Where(x => x.GalleryId == Gallery.Id).ToListAsync();
        return Page();
    }
}
