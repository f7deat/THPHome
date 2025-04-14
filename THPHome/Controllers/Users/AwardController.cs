using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Foundations;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;

namespace THPHome.Controllers.Users;

public class AwardController(ApplicationDbContext context, IAwardService _awardService) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] AwardFilterOptions filterOptions) => Ok(await _awardService.ListAsync(filterOptions));

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Award args)
    {
        var result = await _awardService.AddAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Award args)
    {
        var result = await _awardService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var result = await _awardService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }
}
