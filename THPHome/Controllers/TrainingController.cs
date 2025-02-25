using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using WebUI.Foundations;

namespace THPHome.Controllers;

public class TrainingController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list"), AllowAnonymous]
    public async Task<IActionResult> GetListAsync() => Ok(await _context.TrainingGroups.Where(x => x.Active).OrderBy(x => x.SortOrder).AsNoTracking().ToListAsync());
}
