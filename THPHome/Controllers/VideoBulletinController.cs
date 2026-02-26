using Microsoft.AspNetCore.Mvc;
using THPCore.Interfaces;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPHome.Models.Args.Departments;
using THPHome.Models.Args.VideoBulletin;
using THPHome.Models.Filters.VideoBulletin;
namespace THPHome.Controllers;

public class VideoBulletinController(IVideoBulletinService _videoBulletinService, ApplicationDbContext context) : BaseController(context)
{

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] VideoBulletinFilterOptions filterOptions) => Ok(await _videoBulletinService.ListAsync(filterOptions));

    [HttpPost("create")]
    public async Task<IActionResult> CreateAsync([FromBody] VideoBulletinCreateArgs dto)
    {
        var result = await _videoBulletinService.CreateAsync(dto);
        return result.Succeeded ? Ok(result.Data) : BadRequest(result.Message);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] VideoBulletinUpdateArgs dto)
    {
        var result = await _videoBulletinService.UpdateAsync(dto);
        return result.Succeeded ? Ok() : BadRequest(result.Message);
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var result = await _videoBulletinService.DeleteAsync(id);
        return result.Succeeded ? Ok() : BadRequest(result.Message);
    }
}