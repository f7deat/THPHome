using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class VideoController : Controller
    {
        private readonly IVideoService _videoService;
        public VideoController(IVideoService videoService) => _videoService = videoService;

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _videoService.GetListAsync(0));

        [HttpPost("add")]
        public async Task<IActionResult> AddAsyc([FromBody] Video video) => Ok(await _videoService.AddAsync(video));

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] Video video) => Ok(await _videoService.UpdateAsync(video));

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] long id) => Ok(await _videoService.DeleteAsync(id));
    }
}
