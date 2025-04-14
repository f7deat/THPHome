using THPHome.Models.Galleries;
using WebUI.Models.Filters.Files;

namespace WebUI.Interfaces.IService;

public interface IGalleryService
{
    Task<List<GalleryListResponse>> GalleryListAsync(GalleryFilterOptions filterOptions);
}
