using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using WebUI.Interfaces.IService;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using THPHome.Data;
using THPHome.Helpers;
using THPHome.Entities;

namespace THPHome.Services;

public class LocalizeService(ApplicationDbContext _context, IActionContextAccessor _actionContextAccessor, IMemoryCache _memoryCache) : ILocalizeService
{
    public async Task<string> GetAsync(string key)
    {
        if (string.IsNullOrWhiteSpace(key)) return key;
        var locale = "vi-VN";
        _actionContextAccessor.ActionContext?.HttpContext.Request.Cookies.TryGetValue("locale", out locale);

        var lang = LanguageHelper.GetLanguage(locale);

        var cacheKey = $"{key}-{nameof(Localization)}_{locale}";
        if (!_memoryCache.TryGetValue($"{cacheKey}", out string? cacheValue))
        {
            var i18n = await _context.Localizations.FirstOrDefaultAsync(x => x.Key == key && x.Language == lang);
            if (i18n is null)
            {
                i18n = new Localization
                {
                    Key = key,
                    Language = lang,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                };
                await _context.AddAsync(i18n);
                await _context.SaveChangesAsync();
            }
            cacheValue = i18n.Value ?? key;
            if (cacheValue != key)
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromDays(1));
                _memoryCache.Set(cacheKey, cacheValue, cacheEntryOptions);
            }
        }
        return cacheValue ?? string.Empty;
    }
}
