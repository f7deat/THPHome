using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using THPCore.Helpers;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Helpers;

namespace THPHome.TagHelpers;

public class LocalizeTagHelper(ApplicationDbContext _context, IMemoryCache _memoryCache, IActionContextAccessor actionContextAccessor) : TagHelper
{
    private readonly IActionContextAccessor _actionContextAccessor = actionContextAccessor;

    public string Key { get; set; } = default!;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        if (string.IsNullOrWhiteSpace(Key))
        {
            return;
        }
        output.TagName = null;
        if (_actionContextAccessor.ActionContext is null) return;
        _actionContextAccessor.ActionContext.HttpContext.Request.Cookies.TryGetValue("locale", out string? locale);
        locale = string.IsNullOrWhiteSpace(locale) ? "vi-VN" : locale;
        if (!LocaleHelper.IsAvailable(locale)) locale = "vi-VN";
        var cacheKey = $"{Key}-{nameof(Localization)}_{locale}";
        if (!_memoryCache.TryGetValue($"{cacheKey}", out string? cacheValue))
        {
            var i18n = await _context.Localizations.FirstOrDefaultAsync(x => x.Key == Key && x.Locale == locale);
            if (i18n is null)
            {
                i18n = new Localization
                {
                    Key = Key,
                    Locale = locale ?? "vi-VN",
                    ModifiedBy = "tandc",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                };
                await _context.AddAsync(i18n);
                await _context.SaveChangesAsync();
            }
            cacheValue = i18n.Value ?? Key;
            if (cacheValue != Key)
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromDays(1));
                _memoryCache.Set(cacheKey, cacheValue, cacheEntryOptions);
            }
        }

        output.Content.SetContent(cacheValue);
    }
}
