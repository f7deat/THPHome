using ApplicationCore.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Enums;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters.Files;
using THPHome.Models.Posts;
using THPIdentity.Constants;
using THPIdentity.Entities;
using WebUI.Foundations;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;

namespace THPHome.Controllers;

public class GalleryController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IGalleryService galleryService, ILogService _logService) : BaseController(context)
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly IGalleryService _galleryService = galleryService;

    [HttpGet("list")]
    public async Task<IActionResult> GalleryListAsync([FromQuery] GalleryFilterOptions filterOptions) => Ok(await _galleryService.GalleryListAsync(filterOptions));

    [HttpPost]
    public async Task<IActionResult> GalleryAddAsync([FromBody] PostArgs args, [FromQuery] string locale)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(args.Title)) return BadRequest("Vui lòng nhập tên album");
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            if (!User.IsInRole(RoleName.EDITOR) && !User.IsInRole(RoleName.ADMIN))
            {
                if (user.UserType != UserType.Dean) return BadRequest("Bạn không có quyền tạo album ảnh!");
            }
            await _context.Posts.AddAsync(new Post
            {
                Title = args.Title,
                Description = args.Description,
                Locale = locale,
                Status = PostStatus.PUBLISH,
                Url = SeoHelper.ToSeoFriendly(args.Title),
                Type = PostType.GALLERY,
                DepartmentId = user.DepartmentId,
                CreatedDate = DateTime.Now,
                CreatedBy = user.Id
            });
            await _context.SaveChangesAsync(true);
            return CreatedAtAction(nameof(GalleryAddAsync), THPResult.Success);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPut]
    public async Task<IActionResult> GalleryUpdateAsync([FromBody] Post args)
    {
        try
        {
            var gallery = await _context.Posts.FindAsync(args.Id);
            if (gallery is null) return BadRequest("Gallery not found!");
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user is null) return BadRequest("User not found!");
            if (!User.IsInRole(RoleName.EDITOR) && !User.IsInRole(RoleName.ADMIN))
            {
                if (user.UserType != UserType.Dean) return BadRequest("Bạn không có quyền cập nhật album ảnh.");
            }
            gallery.Title = args.Title;
            gallery.Description = args.Description;
            gallery.ModifiedDate = DateTime.Now;
            gallery.ModifiedBy = User.GetId();
            gallery.Url = SeoHelper.ToSeoFriendly(args.Title);
            _context.Posts.Update(gallery);
            await _context.SaveChangesAsync(true);
            return Ok(IdentityResult.Success);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("options")]
    public async Task<IActionResult> GalleryOptionsAsync()
    {
        return Ok(await _context.Posts.Where(x => x.Type == PostType.GALLERY).OrderBy(x => x.Url).Select(x => new
        {
            label = x.Title,
            value = x.Id
        }).ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> GalleryDeleteAsync([FromRoute] long id)
    {
        var gallery = await _context.Posts.FindAsync(id);
        if (gallery is null) return BadRequest("Gallery not found!");
        if (await _context.Photos.AnyAsync(x => x.PostId == id))
        {
            return BadRequest("Không thể xóa Gallery chứa hình ảnh!");
        }
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user is null) return BadRequest("User not found!");
        if (!User.IsInRole(RoleName.EDITOR) && !User.IsInRole(RoleName.ADMIN))
        {
            if (user.UserType != UserType.Dean) return BadRequest("Bạn không có quyền xóa album ảnh.");
        }
        _context.Posts.Remove(gallery);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("photo/add")]
    public async Task<IActionResult> PhotoAdd([FromBody] Photo args)
    {
        try
        {
            if (args.GalleryId != null)
            {
                var gallery = await _context.Posts.FindAsync(args.PostId);
                if (gallery is null) return BadRequest("Gallery not found!");
            }
            var user = await _userManager.FindByIdAsync(User.GetId());
            if (user == null) return BadRequest("User not found!");
            await _context.Photos.AddAsync(new Photo
            {
                Description = args.Description,
                Url = args.Url,
                PostId = args.PostId,
                FileId = args.FileId
            });
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("photo/list"), AllowAnonymous]
    public async Task<IActionResult> PhotoList([FromQuery] PhotoFilterOptions filterOptions)
    {
        var query = from a in _context.Photos select a;
        if (filterOptions.PostId != null)
        {
            query = query.Where(x => x.PostId == filterOptions.PostId);
        }
        query = query.OrderByDescending(x => x.CreatedDate);
        return Ok(await ListResult<Photo>.Success(query, filterOptions));
    }

    [HttpDelete("photo/{id}")]
    public async Task<IActionResult> PhotoDelete([FromRoute] Guid id)
    {
        var photo = await _context.Photos.FindAsync(id);
        if (photo == null) return BadRequest("Photo not found!");
        _context.Photos.Remove(photo);
        if (photo.FileId != null)
        {
            var file = await _context.ApplicationFiles.FindAsync(photo.FileId);
            if (file != null)
            {
                _context.ApplicationFiles.Remove(file);
            }
        }
        await _context.SaveChangesAsync();
        return Ok();
    }
}
