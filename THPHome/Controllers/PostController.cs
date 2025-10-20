﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Helpers;
using ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using WebUI.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using THPIdentity.Entities;
using THPIdentity.Constants;
using THPHome.Models.Args.Posts;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters;
using THPHome.Enums;
using THPHome.ExternalAPI.Interfaces;
using THPCore.Interfaces;
using THPHome.Foundations;
using THPCore.Models;

namespace THPHome.Controllers;

public class PostController(IHCAService _hcaService, IAttachmentService _attachmentService, IPostService _postService, UserManager<ApplicationUser> _userManager, IWebHostEnvironment _webHostEnvironment, ApplicationDbContext context, ITelegramService _telegramService, IZaloAPI _zaloAPI, ILogService _logService) : BaseController(context)
{
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
        filterOptions.CanSeeAll = User.IsInRole(RoleName.EDITOR) || User.IsInRole(RoleName.ADMIN);
        return Ok(await _postService.GetListAsync(filterOptions));
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] PostFilterOptions filterOptions) => Ok(await _postService.GetListAsync(filterOptions));

    [HttpPost("export")]
    public async Task<IActionResult> ExportAsync() => File(await _postService.ExportAsync(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    [HttpPost("import")]
    public async Task<IActionResult> ImportAsync(IFormFile file) => Ok(await _postService.ImportAsync(file));

    [HttpPost("new")]
    public async Task<IActionResult> NewAsync([FromBody] Post args, [FromQuery] string locale)
    {
        try
        {
            if (args is null) return BadRequest("Dữ liệu không hợp lệ!");
            var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
            if (user is null) return Unauthorized();
            if (user.UserType == UserType.Student) return BadRequest("Tài khoản không có quyền truy cập!");
            var url = SeoHelper.ToSeoFriendly(args.Title);
            if (await _context.Posts.AnyAsync(x => x.Url == url)) return BadRequest("Bài viết đã tồn tại!");
            
            await _context.Posts.AddAsync(new Post
            {
                CategoryId = args.CategoryId,
                CreatedDate = DateTime.Now,
                Title = args.Title,
                CreatedBy = user.Id,
                Description = args.Description,
                Type = args.Type,
                Url = url,
                Locale = locale,
                IssuedDate = DateTime.Now,
                DepartmentId = _hcaService.IsUserInAnyRole(RoleName.ADMIN, RoleName.EDITOR) ? null : user.DepartmentId,
            });
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(NewAsync), IdentityResult.Success);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] AddPostArgs args, [FromQuery] string locale)
    {
        try
        {
            if (args is null) return BadRequest("Dữ liệu không hợp lệ!");

            var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
            if (user is null) return BadRequest("User not found!");

            var post = new Post
            {
                CreatedBy = user.Id,
                CreatedDate = DateTime.Now,
                Thumbnail = args.Thumbnail ?? "https://dhhp.edu.vn/files/1a5acea5-4941-4140-a8f5-56a1d5e4eabd.jpg",
                Title = args.Title,
                Content = args.Content,
                Description = args.Description,
                IssuedDate = args.IssuedDate,
                Type = args.Type,
                Locale = locale,
                CategoryId = args.CategoryId
            };
            var data = await _postService.AddAsync(post);
            if (data.Id > 0)
            {
                await _attachmentService.MapAsync(args.Attachments, data.Id);
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
    public async Task<IActionResult> RemoveAsync([FromRoute] long id) => Ok(await _postService.RemoveAsync(id));

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] long id) => Ok(await _postService.DeleteAsync(id));

    [Route("get/{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] long id)
    {
        var post = await _postService.FindAsync(id);
        if (post is null) return BadRequest();
        if (!string.IsNullOrEmpty(post.Thumbnail))
        {
            if (!post.Thumbnail.StartsWith("http"))
            {
                post.Thumbnail = $"https://dhhp.edu.vn{post.Thumbnail}";
            }
        }
        return Ok(post);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetailAsync([FromRoute] long id)
    {
        var article = await _postService.FindAsync(id);
        if (article is null) return BadRequest();
        if (string.IsNullOrEmpty(article.CreatedBy)) return BadRequest("Không tìm thấy tác giả");
        var author = await _userManager.FindByIdAsync(article.CreatedBy);
        if (author == null) return BadRequest("Không tìm thấy tác giả");

        return Ok(new
        {
            data = new
            {
                article.Id,
                article.Url,
                article.Title,
                article.Description,
                article.Content,
                AuthorName = author.Name,
                AuthorUserName = author.UserName,
                article.CreatedDate,
                article.ModifiedDate,
                article.View,
                article.Thumbnail,
                article.Status,
                article.IssuedDate
            }
        });
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] UpdatePostArgs args)
    {
        try
        {
            if (args is null) return BadRequest("Dữ liệu không hợp lệ.");
            var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
            if (user is null) return Unauthorized();

            var post = await _context.Posts.FindAsync(args.Id);
            if (post is null) return BadRequest("Không tìm thấy bài viết!");
            post.ModifiedBy = user.Id;
            post.Description = args.Description;
            post.Title = args.Title;
            post.Content = args.Content;
            post.Thumbnail = args.Thumbnail;
            post.Type = args.Type;
            post.ModifiedDate = DateTime.Now;
            post.IssuedDate = args.IssuedDate;
            post.CategoryId = args.CategoryId;
            post.Url = SeoHelper.ToSeoFriendly(args.Title);

            await _attachmentService.MapAsync(args.Attachments, post.Id);

            return Ok(await _postService.EditAsync(post));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

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
        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return Unauthorized();
        if (User.IsInRole(RoleName.ADMIN) || User.IsInRole(RoleName.EDITOR) || user.UserType == UserType.Dean)
        {
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
            return BadRequest("Tài khoản không có quyền truy cập!");
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
        try
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
            page.ModifiedBy = _hcaService.GetUserId();
            if (args.CategoryId != null)
            {
                var category = await _context.Categories.FindAsync(args.CategoryId);
                if (category is null) return BadRequest("Category not found!");
            }
            page.CategoryId = args.CategoryId;
            _context.Posts.Update(page);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return BadRequest(ex.ToString());
        }
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
        var query = _context.Posts
            .Where(x => x.CreatedDate.Year == DateTime.Now.Year);

        if (!User.IsInRole(RoleName.ADMIN) && !User.IsInRole(RoleName.EDITOR))
        {
            var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
            if (user is null) return BadRequest("User not found!");
            query = query.Where(x => x.DepartmentId == user.DepartmentId);
        }

        var data = await query
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
            series.Add(data.FirstOrDefault(x => x.Month == i)?.Data ?? 0);
        }
        return Ok(new
        {
            series,
            xAsis
        });
    }

    [HttpGet("meta/{id}"), AllowAnonymous]
    public async Task<IActionResult> GetMetaAsync([FromRoute] string id)
    {
        var post = await _context.Posts.FirstOrDefaultAsync(x => x.Url == id);
        if (post is null) return BadRequest("Data not found!");
        return Ok(new
        {
            post.Title,
            post.Description,
            post.Thumbnail
        });
    }

    [HttpGet("trash")]
    public async Task<IActionResult> GetTrashAsync([FromQuery] TrashedPostFilterOptions filterOptions) => Ok(await _postService.GetTrashAsync(filterOptions));

    [HttpPost("restore/{id}")]
    public async Task<IActionResult> RestoreAsync([FromRoute] long id) => Ok(await _postService.RestoreAsync(id));

    [HttpGet("statistics")]
    public async Task<IActionResult> GetStatisticsAsync()
    {
        var totalPosts = await _postService.GetTotalAsync();
        var totalViews = await _postService.GetTotalViewAsync();
        var totalPostsInYear = await _postService.GetCountInYearAsync(DateTime.Now.Year);
        var totalPostsInMonth = await _postService.GetCountInMonthAsync(DateTime.Now.Month, DateTime.Now.Year);
        return Ok(THPResult.Ok(new
        {
            TotalPosts = totalPosts,
            TotalViews = totalViews,
            TotalPostsInYear = totalPostsInYear,
            TotalPostsInMonth = totalPostsInMonth
        }));
    }
}