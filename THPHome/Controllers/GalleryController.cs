using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Helpers;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPIdentity.Entities;
using WebUI.Entities;
using WebUI.Extensions;
using WebUI.Foundations;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.Files;
using WebUI.Models.Posts;
using WebUI.Models.ViewModel;

namespace WebUI.Controllers;

public class GalleryController : BaseController
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IGalleryService _galleryService;
    public GalleryController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IGalleryService galleryService) : base(context)
    {
        _userManager = userManager;
        _galleryService = galleryService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GalleryListAsync([FromQuery] GalleryFilterOptions filterOptions) => Ok(await _galleryService.GalleryListAsync(filterOptions));

    [HttpPost]
    public async Task<IActionResult> GalleryAddAsync([FromBody] PostArgs args)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(args.Title)) return BadRequest("Vui lòng nhập tên album");
            await _context.Posts.AddAsync(new Post
            {
                Title = args.Title,
                Description = args.Description,
                Language = args.Language,
                Status = PostStatus.PUBLISH,
                Url = SeoHelper.ToSeoFriendly(args.Title),
                Type = PostType.GALLERY
            });
            await _context.SaveChangesAsync(true);
            return CreatedAtAction(nameof(GalleryAddAsync), IdentityResult.Success);
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
            gallery.Title = args.Title;
            gallery.Description = args.Description;
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
        _context.Posts.Remove(gallery);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("photo/add")]
    public async Task<IActionResult> PhotoAdd([FromBody] Photo args)
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

    [HttpGet("photo/list")]
    public async Task<IActionResult> PhotoList([FromQuery] PhotoFilterOptions filterOptions)
    {
        var query = _context.Photos.AsQueryable();
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
