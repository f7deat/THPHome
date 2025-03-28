using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;

namespace THPHome.Pages.Albums;

public class IndexModel(IPostService postService, ApplicationDbContext context, IGalleryService _galleryService) : EntryPageModel(postService, context)
{
    public List<GalleryListResponse> Galleries { get; set; } = [];
    [BindProperty(SupportsGet = true)]
    public GalleryFilterOptions FilterOptions { get; set; } = new();

    public async Task OnGetAsync()
    {
        FilterOptions.Language = PageData.Language;
        Galleries = await _galleryService.GalleryListAsync(FilterOptions);
    }
}
