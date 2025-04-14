using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Foundations;
using THPHome.Interfaces.IService.ITrainings;

namespace THPHome.Controllers.Trainings;

public class MajorController(ApplicationDbContext context, IMajorService _majorService) : BaseController(context)
{
    [HttpGet("all-high-quality-program")]
    public async Task<IActionResult> GetAllHighQualityProgramAsync() => Ok(new { data = await _majorService.GetAllHighQualityProgramAsync() });
}
