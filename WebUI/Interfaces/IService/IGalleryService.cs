using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;

namespace WebUI.Interfaces.IService;

public interface IGalleryService
{
    Task<List<GalleryListResponse>> GalleryListAsync(GalleryFilterOptions filterOptions);
}
