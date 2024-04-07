using ApplicationCore.Entities;
using ApplicationCore.Enums;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebUI.Api;
using WebUI.Extensions;
using WebUI.Helpers;
using WebUI.Models.Filters.Settings;
using WebUI.Models.ViewModel;

namespace WebUI.Controllers;

public class LocalizationController : BaseController
{
    public LocalizationController(ApplicationDbContext context) : base(context)
    {
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] LocalizationFilterOptions filterOptions)
    {
        var lang = LanguageHelper.GetLanguage(filterOptions.Locale);
        var query = _context.Localizations.Where(x => x.Language == lang).OrderBy(x => x.Key);
        return Ok(await ListResult<Localization>.Success(query, filterOptions));
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
