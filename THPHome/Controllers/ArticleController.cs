using ApplicationCore.Enums;
using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
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
}
