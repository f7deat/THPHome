﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Models.Args.Files;
using THPHome.Models.Filters.Files;
using THPIdentity.Entities;
using WebUI.Interfaces.IService;
using WebUI.Models.Args.Files;
using WebUI.Options;

namespace THPHome.Controllers;

public class FileController(IWebHostEnvironment _webHostEnvironment, IHCAService _hcaService, ApplicationDbContext context, ITelegramService _telegramService, UserManager<ApplicationUser> _userManager, IOptions<SettingOptions> _optionsAccessor) : BaseController(context)
{
    public SettingOptions Options { get; } = _optionsAccessor.Value;

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] FileFilterOptions filterOptions)
    {
        var query = from a in _context.ApplicationFiles
                    join b in _context.ApplicationFolders on a.FolderId equals b.Id
                    into ab
                    from b in ab.DefaultIfEmpty()
                    select new
                    {
                        a.Id,
                        a.Url,
                        fileName = a.Name,
                        a.FolderId,
                        folderName = b.Name,
                        a.CreatedDate,
                        a.ModifiedDate,
                        a.Size,
                        a.ContentType
                    };
        query = query.OrderByDescending(x => x.ModifiedDate);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpPost("upload-multi")]
    public async Task<IActionResult> UploadMultiAsync([FromForm] UploadMultiArgs args)
    {
        try
        {
            if (args.Files != null || args.Files is null) return BadRequest("Không tìm thấy tệp tin!");
            var rootPath = Path.Combine(_webHostEnvironment.WebRootPath, "files");
            var applicationFiles = new List<ApplicationFile>();
            foreach (var file in args.Files)
            {
                var folder = Guid.NewGuid().ToString();
                var folderPath = Path.Combine(rootPath, folder);
                if (Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var filePath = Path.Combine(folderPath, file.FileName);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
                var host = Request.Host.Value;
                var url = $"https://{host}/files/{file.FileName}";

                var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
                var applicationFile = new ApplicationFile
                {
                    ContentType = file.ContentType,
                    Name = file.FileName,
                    Size = file.Length,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                    Url = url,
                    CreatedBy = user?.Id,
                    FolderId = args.FolderId
                };
                applicationFiles.Add(applicationFile);
            }
            await _context.ApplicationFiles.AddRangeAsync(applicationFiles);
            await _context.SaveChangesAsync();

            return Ok(applicationFiles.Select(x => new
            {
                x.Id,
                x.CreatedDate,
                x.ContentType,
                x.Url,
                x.Name,
                x.Size,
                x.FolderId
            }));
        }
        catch (Exception ex)
        {
            await _telegramService.SendMessageAsync(ex.ToString());
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("upload"), AllowAnonymous]
    public async Task<IActionResult> UploadAsync([FromForm] SingleUploadArgs args, [FromQuery] string? apiKey)
    {
        try
        {
            if (args.File is null) return BadRequest("File not found!");

            if (string.IsNullOrEmpty(_hcaService.GetUserName()))
            {
                if (string.IsNullOrWhiteSpace(apiKey)) return BadRequest("Unauthorized!");
                if (apiKey != Options.OpenApiKey) return BadRequest("Unauthorized!");
            }

            var folder = Guid.NewGuid().ToString();
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "files", folder);

            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);
            var filePath = Path.Combine(uploadPath, args.File.FileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                await args.File.CopyToAsync(stream);
            }
            var host = Request.Host.Value;
            var url = $"https://{host}/files/{folder}/{args.File.FileName}";

            var applicationFile = new ApplicationFile
            {
                ContentType = args.File.ContentType,
                Name = args.File.FileName,
                Size = args.File.Length,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                Url = url,
                CreatedBy = _hcaService.GetUserName() ?? "tandc"
            };
            await _context.ApplicationFiles.AddAsync(applicationFile);
            await _context.SaveChangesAsync();

            return Ok(new { succeeded = true, url, applicationFile.Id });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("image/upload")]
    public async Task<IActionResult> ImageUploadAsync([FromForm] IFormFile file)
    {
        try
        {
            if (file is null) return BadRequest("File not found!");
            var folder = $"{DateTime.Now.Year}-{DateTime.Now.Month:00}-{DateTime.Now.Day}";
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "img", folder);
            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);
            var filePath = Path.Combine(uploadPath, file.FileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var host = Request.Host.Value;
            var url = $"https://{host}/img/{folder}/{file.FileName}";
            return Ok(new { succeeded = true, url });
        }
        catch (Exception ex)
        {
            await _telegramService.SendMessageAsync(ex.ToString());
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("directories")]
    public IActionResult Folders(string path = "files", int current = 1, int pageSize = 10)
    {
        var folders = new List<dynamic>();
        string pathCombine = Path.Combine(_webHostEnvironment.WebRootPath, path);
        var directories = Directory.GetDirectories(pathCombine);

        var files = new List<dynamic>();

        var filesInDirectory = Directory.GetFiles(pathCombine).Skip((current - 1) * pageSize).Take(pageSize);
        foreach (var item in filesInDirectory)
        {
            var file = new FileInfo(item);
            files.Add(new
            {
                file.Name,
                file.LastWriteTime,
                file.CreationTime,
                length = file.Length / 1024,
                fullName = $"/{path}/{file.Name}"
            });
        }

        foreach (var item in directories)
        {
            var directory = new DirectoryInfo(item);
            folders.Add(new
            {
                directory.CreationTime,
                directory.Name,
                directory.LastWriteTime
            });
        }
        return Ok(new
        {
            folders,
            path,
            files
        });
    }

    [HttpGet("custom-css")]
    public IActionResult GetCustomCss() => Ok(System.IO.File.ReadAllText(Path.Combine(_webHostEnvironment.WebRootPath, "css", "style.css")));

    [HttpGet("total")]
    public async Task<IActionResult> TotalAsync()
    {
        return Ok(await _context.Attachments.CountAsync());
    }
}
