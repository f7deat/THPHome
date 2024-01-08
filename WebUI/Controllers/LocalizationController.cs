using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Api;

namespace WebUI.Controllers
{
    public class LocalizationController : BaseController
    {
        public LocalizationController(ApplicationDbContext context) : base(context)
        {
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListAsync()
        {
            Request.Cookies.TryGetValue("locale", out string locale);
            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }

            var query = _context.Localizations.Where(x => x.Language == lang).OrderBy(x => x.Key);

            return Ok(new
            {
                data = await query.ToListAsync(),
                total = await query.CountAsync()
            });
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Localization localization)
        {
            var locale = await _context.Localizations.FindAsync(localization.Id);
            if (locale is null)
            {
                return BadRequest("Data not found!");
            }
            locale.Value = localization.Value;
            locale.ModifiedDate = DateTime.Now;
            _context.Update(locale);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
        {
            var locale = await _context.Localizations.FindAsync(id);
            if (locale is null)
            {
                return BadRequest("Data not found!");
            }
            _context.Remove(locale);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
