using ApplicationCore.Enums;
using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebUI.Models.Filters.OpenAPI;
using WebUI.Options;

namespace WebUI.Controllers;

[Route("open-api")]
public class OpenAPIController : Controller
{
    private readonly ApplicationDbContext _context;
    public SettingOptions Options { get; }

    public OpenAPIController(ApplicationDbContext context, IOptions<SettingOptions> optionsAccessor)
    {
        _context = context;
        Options = optionsAccessor.Value;
    }

    [HttpGet("posts")]
    public async Task<IActionResult> PostsAsync(PostsFilterOptions filterOptions)
    {
        if (string.IsNullOrWhiteSpace(filterOptions.ApiKey)) return BadRequest("API KEY is required!");
        if (!filterOptions.ApiKey.Equals(Options.OpenApiKey)) return Unauthorized();
        var query = _context.Posts.Where(x => x.Status == PostStatus.PUBLISH)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.Description,
                x.Thumbnail,
                x.Status,
                x.Language,
                x.Type,
                x.Url,
                x.CreatedDate,
                x.ModifiedDate,
                x.View
            });
        if (!string.IsNullOrWhiteSpace(filterOptions.SearchTerm))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.Title) && x.Title.ToLower().Contains(filterOptions.SearchTerm.ToLower()));
        }
        query = query.Where(x => x.Language == filterOptions.Language);
        query = query.Where(x => x.Type == filterOptions.Type);

        var data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.PageIndex - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();

        var categories = await (from a in _context.PostCategories
                                join b in _context.Categories on a.CategoryId equals b.Id
                                select new
                                {
                                    b.Id,
                                    b.Name,
                                    b.NormalizeName,
                                    a.PostId
                                }).ToListAsync();

        var result = data.Select(x => new
        {
            x.Id,
            x.Title,
            x.Description,
            x.CreatedDate,
            x.ModifiedDate,
            x.Thumbnail,
            x.Url,
            x.View,
            categories = categories.Where(c => c.PostId == x.Id).Select(c => new
            {
                c.Id,
                c.Name,
                c.NormalizeName
            }).ToList()
        });

        return Ok(new
        {
            total = await query.CountAsync(),
            data = result
        });
    }

    [HttpGet("post/{id}")]
    public async Task<IActionResult> PostAsync([FromRoute] long id, [FromQuery] string apiKey)
    {
        if (string.IsNullOrWhiteSpace(apiKey)) return BadRequest("API KEY is required!");
        if (!apiKey.Equals(Options.OpenApiKey)) return Unauthorized();

        var post = await _context.Posts.FindAsync(id);
        if (post is null) return NoContent();

        var categories = await (from a in _context.PostCategories
                                join b in _context.Categories on a.CategoryId equals b.Id
                                where a.PostId == id
                                select new
                                {
                                    b.Id,
                                    b.Name,
                                    b.NormalizeName,
                                    a.PostId
                                }).ToListAsync();
        return Ok(new
        {
            post.Id,
            post.Title,
            post.Description,
            post.Url,
            post.Thumbnail,
            post.View,
            post.CreatedDate,
            post.ModifiedDate,
            post.Content,
            categories
        });
    }
}
