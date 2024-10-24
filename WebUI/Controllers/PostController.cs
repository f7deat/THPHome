﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using ApplicationCore.Constants;
using ApplicationCore.Entities;
using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using WebUI.Extensions;
using WebUI.Models.Api.Admin;
using WebUI.Interfaces.IService;
using WebUI.Foundations;
using WebUI.ExternalAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using WebUI.Entities;
using THPIdentity.Entities;

namespace WebUI.Controllers;

public class PostController : BaseController
{

    private readonly IPostService _postService;
    private readonly IPostCategoryService _postCategoryService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IAttachmentService _attachmentService;
    private readonly ITelegramService _telegramService;
    private readonly IZaloAPI _zaloAPI;

    public PostController(IAttachmentService attachmentService, IPostService postService, IPostCategoryService postCategoryService, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, ITelegramService telegramService, IZaloAPI zaloAPI) : base(context)
    {
        _postService = postService;
        _postCategoryService = postCategoryService;
        _userManager = userManager;
        _webHostEnvironment = webHostEnvironment;
        _roleManager = roleManager;
        _attachmentService = attachmentService;
        _telegramService = telegramService;
        _zaloAPI = zaloAPI;
    }

    [Route("post/tag")]
    public async Task<IActionResult> Tag(string name, string searchTerm)
    {
        ViewData["Title"] = name ?? "Tag";
        if (string.IsNullOrEmpty(name))
        {
            return View();
        }
        ViewBag.RandomPosts = await _postService.GetRandomPostsAsync();
        return View(await _postService.GetListInTagSync(name, searchTerm));
    }

    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync([FromQuery] string? keyWords)
    {
        var keyWordsNormalized = SeoHelper.ToSeoFriendly(keyWords);
        return Ok(await _context.Posts.Where(x => x.Status == PostStatus.PUBLISH)
        .Where(x => string.IsNullOrEmpty(keyWordsNormalized) || (!string.IsNullOrEmpty(x.Url) && x.Url.Contains(keyWordsNormalized)))
        .Select(x => new
        {
            label = x.Title,
            value = x.Id
        }).ToListAsync());
    }

    [HttpGet("get-list")]
    public async Task<IActionResult> GetListAsync([FromQuery] PostFilterOptions filterOptions)
    {
        return Ok(await _postService.GetListAsync(filterOptions));
    }

    [HttpPost("export")]
    public async Task<IActionResult> ExportAsync() => File(await _postService.ExportAsync(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    [HttpPost("import")]
    public async Task<IActionResult> ImportAsync(IFormFile file) => Ok(await _postService.ImportAsync(file));

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] PostParam post)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            if (post.Post is null) return BadRequest("Dữ liệu không hợp lệ!");
            post.Post.CreatedBy = user.Id;
            post.Post.ModifiedBy = user.Id;
            if (post.Post.ModifiedDate == null)
            {
                post.Post.ModifiedDate = DateTime.Now;
            }
            if (string.IsNullOrWhiteSpace(post.Post.Thumbnail))
            {
                post.Post.Thumbnail = "https://dhhp.edu.vn/files/1a5acea5-4941-4140-a8f5-56a1d5e4eabd.jpg";
            }
            var data = await _postService.AddAsync(post.Post);
            if (data.Id > 0)
            {
                await _postCategoryService.AddAsync(post.ListCategoryId, data.Id);
                await _attachmentService.MapAsync(post.Attachments, data.Id);
            }
            return CreatedAtAction(nameof(AddAsync), IdentityResult.Success);
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
    public async Task<IActionResult> SetStatusAsync(Post post) => Ok(await _postService.SetStatusAsync(post));

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
        if (blocks.Any())
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
    public async Task<IActionResult> UpdateAsync([FromBody] PostParam post)
    {
        if (post.Post is null) return BadRequest("Dữ liệu không hợp lệ.");

        var user = await _userManager.FindByIdAsync(User.GetId());
        await _postCategoryService.DeleteAsync(post.Post.Id);
        await _postCategoryService.AddAsync(post.ListCategoryId, post.Post.Id);
        await _attachmentService.MapAsync(post.Attachments, post.Post.Id);
        post.Post.ModifiedBy = user?.Id;
        var data = await _postService.FindAsync(post.Post.Id);
        data.Description = post.Post.Description;
        data.Title = post.Post.Title;
        data.Content = post.Post.Content;
        data.Thumbnail = post.Post.Thumbnail;
        data.Type = post.Post.Type;
        data.ModifiedDate = post.Post.ModifiedDate;
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
        if (User.IsInRole(RoleName.ADMIN) || User.IsInRole(RoleName.EDITOR))
        {
            var user = await _userManager.FindByIdAsync(User.GetId());
            var data = await _context.Posts.FindAsync(id);
            if (data is null) return BadRequest("Bài viết không tồn tại!");
            if (_webHostEnvironment.IsProduction())
            {
                if (user is null) return Unauthorized();
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

    [HttpPost("page-builder/update")]
    public async Task<IActionResult> PageBuilderUpdateAsync([FromBody] Post args)
    {
        var page = await _context.Posts.FindAsync(args.Id);
        if (page is null) return BadRequest("Data not found!");
        page.Title = args.Title;
        page.Description = args.Description;
        if (page.Type != PostType.Entry)
        {
            page.Url = SeoHelper.ToSeoFriendly(page.Title);
        }
        page.Thumbnail = args.Thumbnail;
        page.ModifiedDate = DateTime.Now;
        page.ModifiedBy = User.GetId();
        _context.Posts.Update(page);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("zalo/share/{id}"), AllowAnonymous]
    public async Task<IActionResult> CreateZaloArticeAsync([FromRoute] long id)
    {
        try
        {
            var post = await _context.Posts.FindAsync(id);
            if (post is null || string.IsNullOrEmpty(post.Title) || string.IsNullOrEmpty(post.Description)) return BadRequest("Data not found!");
            if (post.Description.Length > 150) return BadRequest("Mô tả bài viết không được vượt quá 150 ký tự");
            if (await _context.ZaloArticles.AnyAsync(x => x.PostId == id)) return BadRequest("Đã chia sẻ lên Zalo OA. Vui lòng kiểm tra lịch sử chia sẻ");
            var response = await _zaloAPI.CreateArticle(post);
            if (string.IsNullOrEmpty(response)) return Ok();
            return BadRequest(response);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("chart-post-created-in-year")]
    public async Task<IActionResult> GetPostCreatedInYearAsync()
    {
        var xAsis = new List<string> { "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12" };
        var series = new List<int>();
        var query = await _context.Posts
            .Where(x => x.CreatedDate.Year == DateTime.Now.Year)
            .Select(x => new
        {
            x.Id,
            x.CreatedDate
        }).GroupBy(x => x.CreatedDate.Month)
        .Select(x => new
        {
            Month = x.Key,
            Data = x.Count()
        }).ToListAsync();
        for (int i = 1; i < 13; i++)
        {
            series.Add(query.FirstOrDefault(x => x.Month == i)?.Data ?? 0);
        }
        return Ok(new
        {
            series,
            xAsis
        });
    }
}