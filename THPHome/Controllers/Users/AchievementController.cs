using Microsoft.AspNetCore.Mvc;
using THPCore.Interfaces;
using THPHome.Data;
using THPHome.Foundations;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Users.Achievements;

namespace THPHome.Controllers.Users;

public class AchievementController(ApplicationDbContext context, IHCAService _hcaService, IAchievementService _achievementService, IWebHostEnvironment _webHostEnvironment) : BaseController(context)
{
    [HttpPost("upload-evidence")]
    public async Task<IActionResult> UploadEvidenceAsync([FromForm] UploadEvidenceArgs args)
    {
        if (args.File is null) return BadRequest("Vui lòng chọn minh chứng!");
        var userName = _hcaService.GetUserName();
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
        var fileUrl = $"{Request.Scheme}://{Request.Host}/files/{userName}/{args.File.FileName}";
        return Ok(await _achievementService.UploadEvidenceAsync(args.AchievementId, fileUrl));
    }
}
