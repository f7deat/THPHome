using Microsoft.AspNetCore.Mvc;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Foundations;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters.Users;
using THPHome.Models.Users.Awards;

namespace THPHome.Controllers.Users;

public class AwardController(ApplicationDbContext context, IAwardService _awardService, IWebHostEnvironment _webHostEnvironment) : BaseController(context)
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

    [HttpPost("upload-evidence")]
    public async Task<IActionResult> UploadEvidenceAsync([FromForm] AwardEvidenceUploadArgs args)
    {
        if (args.File == null || args.File.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }
        var userName = User.GetUserName();
        var folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "files", userName);
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
        var filePath = Path.Combine(folderPath, args.File.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await args.File.CopyToAsync(stream);
        }
        var fileUrl = $"{Request.Scheme}://{Request.Host.Value}/files/{userName}/{args.File.FileName}";
        return Ok(await _awardService.UploadEvidenceAsync(args.Id, fileUrl));
    }
}
