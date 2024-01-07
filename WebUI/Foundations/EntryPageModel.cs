using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;

namespace WebUI.Foundations
{
    public class EntryPageModel : PageModel
    {
        protected readonly IPostService _postService;
        public EntryPageModel(IPostService postService)
        {
            _postService = postService;
        }

        public Post PageData { private set; get; } = new Post();

        public override async Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
        {
            var page = context.RouteData.Values["page"]?.ToString();
            if (string.IsNullOrEmpty(page))
            {
                return;
            }
            var language = Request.Cookies.TryGetValue("locale", out string locale);
            var catalog = await _postService.EnsureDataAsync(page.ToLower(), PostType.PAGE, locale);
            PageData = catalog;
            ViewData["Title"] = catalog.Title;
            ViewData["Description"] = catalog.Description;
            ViewData["Image"] = catalog.Thumbnail;
            RouteData.Values.TryAdd(nameof(Post), catalog);
        }
    }
}
