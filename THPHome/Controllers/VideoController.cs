using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using WebUI.Foundations;

namespace THPHome.Controllers;

public class VideoController(IVideoService _videoService, ApplicationDbContext context) : BaseController(context)
{
    [Route("get-list")]
    public async Task<IActionResult> GetListAsync() => Ok(await _videoService.GetListAsync(0));

    [HttpPost("add")]
    public async Task<IActionResult> AddAsyc([FromBody] Video video) => Ok(await _videoService.AddAsync(video));

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Video video) => Ok(await _videoService.UpdateAsync(video));

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] long id) => Ok(await _videoService.DeleteAsync(id));
}
