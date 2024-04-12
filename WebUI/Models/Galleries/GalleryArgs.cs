using ApplicationCore.Enums;
using WebUI.Entities;
using WebUI.Helpers;

namespace WebUI.Models.Galleries;

public class GalleryArgs : Gallery
{
    public string? Locale { get; set; }
    public Language Language => LanguageHelper.GetLanguage(Locale);
}
