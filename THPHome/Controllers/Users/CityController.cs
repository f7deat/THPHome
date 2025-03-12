using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;
using WebUI.Foundations;

namespace THPHome.Controllers.Users;

public class CityController(ApplicationDbContext context, ICityService _cityService) : BaseController(context)
{
    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync([FromQuery] CitySelect select) => Ok(await _cityService.GetOptionsAsync(select));
}
