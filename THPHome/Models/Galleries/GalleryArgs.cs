using ApplicationCore.Enums;
using THPHome.Helpers;
using WebUI.Entities;

namespace WebUI.Models.Galleries;

public class GalleryArgs : Gallery
{
    public string? Locale { get; set; }
    public Language Language => LanguageHelper.GetLanguage(Locale);
}
