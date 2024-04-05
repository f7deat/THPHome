using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.OpenAPI;

public class PhotoFilterOptions : OpenApiFilterOptions
{
    public Guid? GalleryId { get; set; }
}
