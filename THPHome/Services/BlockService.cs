using Newtonsoft.Json;
using WebUI.Interfaces.IService;
using WebUI.Models.Blocks;

namespace WebUI.Services;

public class BlockService : IBlockService
{
    public object? DeserializeObject(string normalizedName, string data)
    {
        if (string.IsNullOrWhiteSpace(data)) return default;

        return normalizedName switch
        {
            nameof(DividerBlock) => JsonConvert.DeserializeObject<DividerBlock>(data),
            nameof(HtmlBlock) => JsonConvert.DeserializeObject<HtmlBlock>(data),
            nameof(TextBlock) => JsonConvert.DeserializeObject<TextBlock>(data),
            nameof(TinyMCEBlock) => JsonConvert.DeserializeObject<TinyMCEBlock>(data),
            nameof(VideoBlock) => JsonConvert.DeserializeObject<VideoBlock>(data),
            nameof(SponsorBlock) => JsonConvert.DeserializeObject<SponsorBlock>(data),
            nameof(SideGalleryBlock) => JsonConvert.DeserializeObject<SideGalleryBlock>(data),
            nameof(MajorGeneralBlock) => JsonConvert.DeserializeObject<MajorGeneralBlock>(data),
            _ => default,
        };
    }
}
