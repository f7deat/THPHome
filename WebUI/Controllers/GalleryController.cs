using ApplicationCore.Entities;
using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Api;
using WebUI.Entities;
using WebUI.Extensions;
using WebUI.Models.Filters.Files;
using WebUI.Models.Galleries;
using WebUI.Models.ViewModel;

namespace WebUI.Controllers;

public class GalleryController : BaseController
{
    private readonly UserManager<ApplicationUser> _userManager;
    public GalleryController(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : base(context)
    {
        _userManager = userManager;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GalleryListAsync([FromQuery] GalleryFilterOptions filterOptions)
    {
        var query = from a in _context.Galleries
                    select new GalleryListResponse
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        ModifiedDate = a.ModifiedDate,
                        Count = _context.Photos.Count(x => x.GalleryId == a.Id)
                    };
        if (!string.IsNullOrWhiteSpace(filterOptions.Name))
        {
            query = query.Where(x => x.Name.ToLower().Contains(filterOptions.Name.ToLower()));
        }
        query = query.OrderByDescending(x => x.ModifiedDate);
        var result = await query.ToListAsync();
        result.Insert(0, new GalleryListResponse
        {
            Name = "Chưa phân loại",
            Id = Guid.Empty,
            Count = await _context.Photos.CountAsync(x => x.GalleryId == null || x.GalleryId == Guid.Empty)
        });
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> GalleryAddAsync([FromBody] Gallery args)
    {
        await _context.Galleries.AddAsync(new Gallery
        {
            CreatedBy = User.GetId(),
            CreatedDate = DateTime.Now,
            Description = args.Description,
            Name = args.Name,
            ModifiedDate = DateTime.Now
        });
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GalleryAddAsync), IdentityResult.Success);
    }

    [HttpPut]
    public async Task<IActionResult> GalleryUpdateAsync([FromBody] Gallery args)
    {
        var gallery = await _context.Galleries.FindAsync(args.Id);
        if (gallery is null) return BadRequest("Gallery not found!");
        gallery.ModifiedDate = DateTime.Now;
        gallery.Name = args.Name;
        gallery.ModifiedBy = User.GetId();
        gallery.Description = args.Description;
        _context.Galleries.Update(gallery);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpGet("options")]
    public async Task<IActionResult> GalleryOptionsAsync()
    {
        return Ok(await _context.Galleries.OrderBy(x => x.Name).Select(x => new
        {
            label = x.Name,
            value = x.Id
        }).ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> GalleryDeleteAsync([FromRoute] Guid id)
    {
        var gallery = await _context.Galleries.FindAsync(id);
        if (gallery is null) return BadRequest("Gallery not found!");
        if (await _context.Photos.AnyAsync(x => x.GalleryId == id))
        {
            return BadRequest("Không thể xóa Gallery chứa hình ảnh!");
        }
        _context.Galleries.Remove(gallery);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("photo/add")]
    public async Task<IActionResult> PhotoAdd([FromBody] Photo args)
    {
        if (args.GalleryId != null)
        {
            var gallery = await _context.Galleries.FindAsync(args.GalleryId);
            if (gallery is null) return BadRequest("Gallery not found!");
        }
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user == null) return BadRequest("User not found!");
        await _context.Photos.AddAsync(new Photo
        {
            CreatedBy = user.Id,
            CreatedDate = DateTime.Now,
            Description = args.Description,
            Url = args.Url,
            ModifiedDate = DateTime.Now,
            GalleryId = args.GalleryId,
            FileId = args.FileId
        });
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("photo/list")]
    public async Task<IActionResult> PhotoList([FromQuery] PhotoFilterOptions filterOptions)
    {
        var photos = _context.Photos.Where(x => filterOptions.GalleryId == null || x.GalleryId == filterOptions.GalleryId).OrderByDescending(x => x.CreatedDate);
        return Ok(await ListResult<Photo>.Success(photos, filterOptions));
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
