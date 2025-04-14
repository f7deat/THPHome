using THPCore.Models;
using THPHome.Models.Filters.Files;
using THPHome.Models.Galleries;

namespace THPHome.Interfaces.IService;

public interface IGalleryService
{
    Task<ListResult<GalleryListResponse>> GalleryListAsync(GalleryFilterOptions filterOptions);
}
