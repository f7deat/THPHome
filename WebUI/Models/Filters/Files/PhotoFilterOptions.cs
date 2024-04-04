using ApplicationCore.Models.Filters;

namespace WebUI.Models.Filters.Files;

public class PhotoFilterOptions : FilterOptions
{
    public Guid? GalleryId { get; set; }
}
