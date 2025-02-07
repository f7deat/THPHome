using ApplicationCore.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Models.Filters.Articles;
using THPHome.Models.Filters.OpenAPI.Articles;
using WebUI.Foundations;
using WebUI.Models.ViewModel;

namespace THPHome.Controllers;

public class ArticleController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("open-list")]
    public async Task<IActionResult> GetListArticleAsync([FromQuery] OpenArticleFilterOptions filterOptions)
    {
        var query = from a in _context.Posts
                    where a.Status == PostStatus.PUBLISH && a.Language == filterOptions.Language && a.Type == PostType.NEWS
                    select new
                    {
                        a.Id,
                        a.Url,
                        a.CreatedDate,
                        a.ModifiedDate,
                        a.Title,
                        a.Description,
                        a.Thumbnail,
                        a.View,
                        a.CreatedBy,
                        a.ModifiedBy
                    };
        if (!string.IsNullOrEmpty(filterOptions.Title))
        {
            query = query.Where(x => x.Title.Contains(filterOptions.Title, StringComparison.CurrentCultureIgnoreCase));
        }
        query = query.OrderByDescending(x => x.CreatedDate);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpGet("list"), AllowAnonymous]
    public async Task<IActionResult> GetListAsync([FromQuery] ArticleFilterOptions filterOptions)
    {
        var query = from a in _context.Posts
                    where a.Locale == filterOptions.Locale && a.Status == PostStatus.PUBLISH
                    select new
                    {
                        a.Id,
                        a.Url,
                        a.CreatedDate,
                        a.ModifiedDate,
                        a.Title,
                        a.Description,
                        a.Thumbnail,
                        a.View,
                        a.CategoryId
                    };
        if (filterOptions.CategoryId != null)
        {
            query = query.Where(x => x.CategoryId == filterOptions.CategoryId);
        }
        query = query.OrderByDescending(x => x.CreatedDate);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpGet("{url}"), AllowAnonymous]
    public async Task<IActionResult> GetByUrlAsync([FromRoute] string url) => Ok(await _context.Posts.FirstOrDefaultAsync(x => x.Url == url && x.Status == PostStatus.PUBLISH));
}
