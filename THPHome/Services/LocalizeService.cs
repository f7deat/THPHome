using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using WebUI.Interfaces.IService;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using THPHome.Data;
using THPHome.Helpers;

namespace WebUI.Services;

public class LocalizeService : ILocalizeService
{
    private readonly ApplicationDbContext _context;
    private readonly IActionContextAccessor _actionContextAccessor;
    private readonly IMemoryCache _memoryCache;
    public LocalizeService(ApplicationDbContext context, IActionContextAccessor actionContextAccessor, IMemoryCache memoryCache)
    {
        _context = context;
        _actionContextAccessor = actionContextAccessor;
        _memoryCache = memoryCache;
    }

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
