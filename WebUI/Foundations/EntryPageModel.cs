using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;

namespace WebUI.Foundations
{
    public class EntryPageModel : PageModel
    {
        protected readonly IPostService _postService;
        protected readonly ApplicationDbContext _context;

        public EntryPageModel(IPostService postService, ApplicationDbContext context)
        {
            _postService = postService;
            _context = context;
        }

        public Post PageData { private set; get; } = new Post();

        public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
        {
            var page = context.RouteData.Values["page"]?.ToString();
            if (string.IsNullOrEmpty(page))
            {
                return;
            }
            Request.Cookies.TryGetValue("locale", out string locale);
            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }
            var catalog = await _postService.EnsureDataAsync(page.ToLower(), PostType.PAGE, lang);
            PageData = catalog;
            ViewData["Title"] = catalog.Title;
            ViewData["Description"] = catalog.Description;
            ViewData["Image"] = catalog.Thumbnail;
            RouteData.Values.TryAdd(nameof(Post), catalog);
        }
    }
}
