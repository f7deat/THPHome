using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Foundations;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;

namespace THPHome.Controllers.Users;

public class CityController(ApplicationDbContext context, ICityService _cityService) : BaseController(context)
{
    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync([FromQuery] CitySelect select)
    {
		try
		{
            return Ok(await _cityService.GetOptionsAsync(select));
        }
		catch (Exception ex)
		{
            return BadRequest(ex.ToString());
		}
    }
}
