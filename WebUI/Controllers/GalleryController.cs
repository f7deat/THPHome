using ApplicationCore.Entities;
using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebUI.Api;
using WebUI.Entities;
using WebUI.Extensions;
using WebUI.Models.Filters.Files;
using WebUI.Models.ViewModel;

namespace WebUI.Controllers;

public class GalleryController : BaseController
{
    private readonly UserManager<ApplicationUser> _userManager;
    public GalleryController(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : base(context)
    {
        _userManager = userManager;
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
