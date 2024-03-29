﻿using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebUI.Models.Api.Admin;
using Infrastructure;
using WebUI.Extensions;
using WebUI.Interfaces.IService;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace WebUI.Api;

public class PostController : BaseController
{
    private readonly IPostService _postService;
    private readonly IPostCategoryService _postCategoryService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IAttachmentService _attachmentService;
    private readonly ITelegramService _telegramService;

    public PostController(IAttachmentService attachmentService, IPostService postService, IPostCategoryService postCategoryService, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, ITelegramService telegramService) : base(context)
    {
        _postService = postService;
        _postCategoryService = postCategoryService;
        _userManager = userManager;
        _webHostEnvironment = webHostEnvironment;
        _roleManager = roleManager;
        _attachmentService = attachmentService;
        _telegramService = telegramService;
    }

    [HttpGet("get-list")]
    public async Task<IActionResult> GetListAsync([FromQuery] PostFilterOptions filterOptions)
    {
        return Ok(await _postService.GetListAsync(filterOptions));
    }

    [Route("get-in-category/{id}")]
    public async Task<IActionResult> GetInCategoryAsync(int id) => Ok(await _postService.GetInCategoryAsync(id));

    [HttpPost("export")]
    public async Task<IActionResult> ExportAsync() => File(await _postService.ExportAsync(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    [HttpPost("import")]
    public async Task<IActionResult> ImportAsync(IFormFile file) => Ok(await _postService.ImportAsync(file));

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody]PostParam post)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            post.Post.CreatedBy = user.Id;
            post.Post.ModifiedBy = user.Id;
            if (string.IsNullOrWhiteSpace(post.Post.Thumbnail))
            {
                post.Post.Thumbnail = "https://dhhp.edu.vn/files/f4567e2b-ef79-4bd1-86c4-c4a97a79fb19.png";
            }
            var data = await _postService.AddAsync(post.Post);
            if (data.Id > 0)
            {
                await _postCategoryService.AddAsync(post.ListCategoryId, data.Id);
                await _attachmentService.MapAsync(post.Attachments, data.Id);
            }
            if (_webHostEnvironment.IsProduction())
            {
                await _telegramService.SendMessageAsync($"{user.UserName} added: {post.Post.Title} -> https://dhhp.edu.vn/post/{data.Url}-{data.Id}.html");
            }
            return CreatedAtAction(nameof(AddAsync), new { succeeded = true });
        }
        catch (Exception ex)
        {
            if (_webHostEnvironment.IsProduction())
            {
                await _telegramService.SendMessageAsync($"CREATE ARTICLE ERROR: {ex}");
            }
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("set-status")]
    public async Task<IActionResult> SetStatusAsync(Post post)
    {
        var data = await _context.Posts.FindAsync(post.Id);
        var user = await _userManager.FindByIdAsync(User.GetId());
        var text = post.Status == PostStatus.PUBLISH ? "publish" : "draft";
        if (_webHostEnvironment.IsProduction())
        {
            await _telegramService.SendMessageAsync($"{user.UserName} {text}: {data.Title} -> https://dhhp.edu.vn/post/{data.Url}-{data.Id}.html");
        }
        return Ok(await _postService.SetStatusAsync(post));
    }

    [HttpPost("remove/{id}")]
    public async Task<IActionResult> RemoveAsync([FromRoute] long id)
    {
        var post = await _context.Posts.FindAsync(id);
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (_webHostEnvironment.IsProduction())
        {
            await _telegramService.SendMessageAsync($"{user.UserName} deleted: {post.Title} -> https://dhhp.edu.vn/post/{post.Url}-{post.Id}.html");
        }
        var blocks = await _context.PostBlocks.Where(x => x.PostId == id).ToListAsync();
        if (!blocks.IsNullOrEmpty())
        {
            _context.PostBlocks.RemoveRange(blocks);
            await _context.SaveChangesAsync();
        }
        return Ok(await _postService.RemoveAsync(id));
    }

    [Route("get/{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] long id)
    {
        var post = await _postService.FindAsync(id);
        if (!string.IsNullOrEmpty(post.Thumbnail))
        {
            if (!post.Thumbnail.StartsWith("http"))
            {
                post.Thumbnail = $"https://dhhp.edu.vn{post.Thumbnail}";
            }
        }
        return Ok(post);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody]PostParam post)
    {
        var user = await _userManager.FindByIdAsync(User.GetId());
        await _postCategoryService.DeleteAsync(post.Post.Id);
        await _postCategoryService.AddAsync(post.ListCategoryId, post.Post.Id);
        await _attachmentService.MapAsync(post.Attachments, post.Post.Id);
        post.Post.ModifiedBy = user.Id;
        var data = await _postService.FindAsync(post.Post.Id);
        data.Description = post.Post.Description;
        data.Title = post.Post.Title;
        data.Content = post.Post.Content;
        data.Thumbnail = post.Post.Thumbnail;
        data.Type = post.Post.Type;
        data.ModifiedDate = post.Post.ModifiedDate;
        if (_webHostEnvironment.IsProduction())
        {
            _ = _telegramService.SendMessageAsync($"{user.UserName} updated: {post.Post.Title} -> https://dhhp.edu.vn/post/{data.Url}-{data.Id}.html");
        }
        return Ok(await _postService.EditAsync(data));
    }

    [Route("get-list-category-id-in-post/{postId}")]
    public async Task<IActionResult> GetListCategoryIdInPostAsync(long postId) => Ok(await _postCategoryService.GetListCategoryIdInPostAsync(postId));

    [HttpGet("attachment-list-in-post/{id}")]
    public async Task<IActionResult> GetAttachmentsAsync([FromRoute] long id) => Ok(await _attachmentService.GetListInPostAsync(id));

    [Route("get-total")]
    public async Task<IActionResult> GetTotalAsync() => Ok(await _postService.GetTotalAsync());

    [Route("get-view")]
    public async Task<IActionResult> GetView() => Ok(await _postService.GetTotalViewAsync());

    [Route("get-count-in-user/{id}")]
    public async Task<IActionResult> GetCountInUserAsync([FromRoute] string id) => Ok(await _postService.GetCountInUserAsync(id));

    [Route("get-list-popular")]
    public async Task<IActionResult> GetListPopularAsync() => Ok(await _postService.GetListPopularAsync());

    [Route("get-list-in-user/{id}")]
    public async Task<IActionResult> GetListByUserAsync(string id) => Ok(await _postService.GetListByUserAsync(id));

    [HttpPost("upload")]
    public async Task<IActionResult> UploadAsync([FromForm] IFormFile file)
    {
        try
        {
            if (file?.Length > 0)
            {
                var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "files");

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                var fileName = Guid.NewGuid();
                var extension = Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadPath, fileName + extension);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                var attach = new Attachment
                {
                    Id = fileName,
                    Extension = extension,
                    Name = file.FileName
                };

                await _attachmentService.AddAsync(attach);

                return Ok(new { succeeded = true, fileUrl = $"/files/{fileName}{extension}", attach });
            }
            return Ok(new { succeeded = false, fileUrl = "" });
        }
        catch (Exception ex)
        {
            if (_webHostEnvironment.IsProduction())
            {
                _ = _telegramService.SendMessageAsync(ex.ToString());
            }
            return BadRequest();
        }
    }

    [HttpPost("active/{id}")]
    public async Task<IActionResult> SetActiveAsync([FromRoute] long id)
    {
        if (User.IsInRole(RoleName.ADMIN))
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            var data = await _context.Posts.FindAsync(id);
            if (_webHostEnvironment.IsProduction())
            {
                _ = _telegramService.SendMessageAsync($"{user.UserName} publish: {data.Title} -> https://dhhp.edu.vn/post/{data.Url}-{data.Id}.html");
            }
            return Ok(await _postService.SetActiveAsync(id));
        }
        else
        {
            return Ok(new { succeeded = false, message = "Truy cập bị từ chối!" });
        }
    }

    [HttpDelete("file/delete/{id}")]
    public async Task<IActionResult> DeleteAttachmentAsync([FromRoute] Guid id)
    {
        return Ok(await _attachmentService.DeleteAsync(id));
    }
}
