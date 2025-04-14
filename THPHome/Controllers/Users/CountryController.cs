using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Foundations;

namespace THPHome.Controllers.Users;

public class CountryController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync()
    {
        var query = await _context.Countries.OrderBy(x => x.Name)
            .Select(x => new
            {
                label = x.Name,
                value = x.Id
            }).ToListAsync();
        return Ok(query);
    }
}
