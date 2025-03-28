using Microsoft.AspNetCore.Mvc;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Helpers;
using THPHome.Models.ViewModel;
using WebUI.Foundations;
using WebUI.Models.Filters.Settings;

namespace THPHome.Controllers;

public class LocalizationController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] LocalizationFilterOptions filterOptions)
    {
        var lang = LanguageHelper.GetLanguage(filterOptions.Locale);
        var query = _context.Localizations.Where(x => x.Language == lang);
        if (!string.IsNullOrWhiteSpace(filterOptions.Key))
        {
            query = query.Where(x => x.Key.ToLower().Contains(filterOptions.Key.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.Value))
        {
            query = query.Where(x => x.Value != null && x.Value.ToLower().Contains(filterOptions.Value.ToLower()));
        }
        return Ok(await ListResult<Localization>.Success(query.OrderBy(x => x.Key), filterOptions));
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
        locale.ModifiedBy = User.GetId();
        _context.Update(locale);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var locale = await _context.Localizations.FindAsync(id);
        if (locale is null) return BadRequest("Data not found!");
        _context.Remove(locale);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
