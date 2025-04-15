using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Models;
using THPHome.Data;
using THPHome.Enums;
using THPHome.Foundations;
using THPHome.Models.Filters.Articles;

namespace THPHome.Controllers;

public class ArticleController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("list"), AllowAnonymous]
    public async Task<IActionResult> GetListAsync([FromQuery] ArticleFilterOptions filterOptions)
    {
        var query = from a in _context.Posts
                    join b in _context.Categories on a.CategoryId equals b.Id into ab
                    from b in ab.DefaultIfEmpty()
                    where a.Locale == filterOptions.Locale && a.Status == PostStatus.PUBLISH && a.Type == PostType.NEWS
                    select new
                    {
                        a.Id,
                        a.Url,
                        CreatedDate = a.IssuedDate,
                        a.ModifiedDate,
                        a.Title,
                        a.Description,
                        a.Thumbnail,
                        a.View,
                        a.CategoryId,
                        a.Type,
                        a.DepartmentId,
                        CategoryName = b.Name
                    };
        if (filterOptions.CategoryId != null)
        {
            query = query.Where(x => x.CategoryId == filterOptions.CategoryId);
        }
        if (filterOptions.Type != null)
        {
            query = query.Where(x => x.Type == filterOptions.Type);
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.Title))
        {
            query = query.Where(x => x.Title.ToLower().Contains(filterOptions.Title.ToLower()));
        }
        if (filterOptions.DepartmentId != null)
        {
            query = query.Where(x => x.DepartmentId == filterOptions.DepartmentId);
        }
        query = query.OrderByDescending(x => x.CreatedDate);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpGet("{url}"), AllowAnonymous]
    public async Task<IActionResult> GetByUrlAsync([FromRoute] string url)
    {
        var article = await _context.Posts.FirstOrDefaultAsync(x => x.Url == url && x.Status == PostStatus.PUBLISH);
        if (article != null)
        {
            article.View++;
            await _context.SaveChangesAsync();
            return Ok(article);
        }
        return Ok(article);
    }
}
