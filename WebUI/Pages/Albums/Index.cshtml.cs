using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using WebUI.Entities;
using WebUI.Foundations;

namespace WebUI.Pages.Albums
{
    public class IndexModel : EntryPageModel
    {
        public IndexModel(IPostService postService, ApplicationDbContext context) : base(postService, context)
        {
        }

        public List<Gallery> Galleries { get; set; } = [];

        public async Task OnGetAsync()
        {
            Galleries = await _context.Galleries.ToListAsync();
        }
    }
}
