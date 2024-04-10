using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Entities;
using WebUI.Foundations;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;

namespace WebUI.Pages.Albums
{
    public class IndexModel : EntryPageModel
    {
        private readonly IGalleryService _galleryService;
        public IndexModel(IPostService postService, ApplicationDbContext context, IGalleryService galleryService) : base(postService, context)
        {
            _galleryService = galleryService;
        }

        public List<GalleryListResponse> Galleries { get; set; } = [];
        [BindProperty(SupportsGet = true)]
        public GalleryFilterOptions FilterOptions { get; set; } = new();

        public async Task OnGetAsync()
        {
            Galleries = await _galleryService.GalleryListAsync(FilterOptions);
        }
    }
}
