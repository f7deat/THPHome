using ApplicationCore.Enums;
using THPHome.Entities;
using THPHome.Helpers;

namespace WebUI.Models.Galleries;

public class GalleryArgs : Gallery
{
    public string? Locale { get; set; }
    public Language Language => LanguageHelper.GetLanguage(Locale);
}
