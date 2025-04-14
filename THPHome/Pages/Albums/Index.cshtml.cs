using Microsoft.AspNetCore.Mvc;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters.Files;
using THPHome.Models.Galleries;

namespace THPHome.Pages.Albums;

public class IndexModel(IPostService postService, IGalleryService _galleryService) : EntryPageModel(postService)
{
    public IEnumerable<GalleryListResponse> Galleries { get; set; } = [];
    [BindProperty(SupportsGet = true)]
    public GalleryFilterOptions FilterOptions { get; set; } = new();

    public async Task OnGetAsync()
    {
        FilterOptions.Locale = PageData.Locale;
        var galleries = await _galleryService.GalleryListAsync(FilterOptions);
        Galleries = galleries.Data;
    }
}
