using ApplicationCore.Entities;
using ApplicationCore.Enums;
using Infrastructure;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace WebUI.TagHelpers
{
    public class LocalizeTagHelper : TagHelper
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IActionContextAccessor _actionContextAccessor;

        public LocalizeTagHelper(ApplicationDbContext context, IMemoryCache memoryCache, IActionContextAccessor actionContextAccessor)
        {
            _context = context;
            _memoryCache = memoryCache;
            _actionContextAccessor = actionContextAccessor;
        }

        public string Key { get; set; }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            if (string.IsNullOrWhiteSpace(Key))
            {
                return;
            }
            output.TagName = null;

            _actionContextAccessor.ActionContext.HttpContext.Request.Cookies.TryGetValue("locale", out string locale);

            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }

            var cacheKey = $"{Key}-{nameof(Localization)}";
            if (!_memoryCache.TryGetValue($"{cacheKey}", out string cacheValue))
            {
                var i18n = await _context.Localizations.FirstOrDefaultAsync(x => x.Key == Key && x.Language == lang);
                if (i18n is null)
                {
                    i18n = new Localization
                    {
                        Key = Key,
                        Language = lang,
                        CreatedBy = Guid.Empty.ToString(),
                        ModifiedBy = Guid.Empty.ToString(),
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
}
