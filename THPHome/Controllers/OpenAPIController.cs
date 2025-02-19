using ApplicationCore.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebUI.Interfaces.IService;
using WebUI.Models.Filters.OpenAPI;
using WebUI.Options;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ApplicationCore.Entities;
using THPHome.Data;
using Microsoft.AspNetCore.Authorization;

namespace THPHome.Controllers;

[Route("open-api")]
public class OpenAPIController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IBlockService _blockService;
    private readonly IRazorViewEngine _razorViewEngine;
    private readonly IServiceProvider _serviceProvider;
    private readonly ITempDataProvider _tempDataProvider;

    public OpenAPIController(ApplicationDbContext context, IOptions<SettingOptions> optionsAccessor, IBlockService blockService, IRazorViewEngine razorViewEngine, IServiceProvider serviceProvider, ITempDataProvider tempDataProvider)
    {
        _context = context;
        Options = optionsAccessor.Value;
        _blockService = blockService;
        _razorViewEngine = razorViewEngine;
        _serviceProvider = serviceProvider;
        _tempDataProvider = tempDataProvider;
    }

    public SettingOptions Options { get; }

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
        if (filterOptions.CategoryId != null)
        {
            query = from a in _context.PostCategories
                    join b in query on a.PostId equals b.Id
                    where a.CategoryId == filterOptions.CategoryId
                    select b;
        }

        var data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();

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

    [HttpGet("partners")]
    public async Task<IActionResult> GetPartners([FromQuery] string apiKey)
    {
        if (string.IsNullOrWhiteSpace(apiKey)) return BadRequest("API KEY is required!");
        if (!apiKey.Equals(Options.OpenApiKey)) return Unauthorized();
        var query = await _context.Partners.Where(x => x.Status == ParnerStatus.Active).ToListAsync();
        return Ok(query);
    }

    [HttpGet("photos")]
    public async Task<IActionResult> GetPhotos([FromQuery] PhotoFilterOptions filterOptions)
    {
        if (string.IsNullOrWhiteSpace(filterOptions.ApiKey)) return BadRequest("API KEY is required!");
        if (!filterOptions.ApiKey.Equals(Options.OpenApiKey)) return Unauthorized();
        var query = await _context.Photos.Where(x => filterOptions.PostId == null || x.PostId == filterOptions.PostId).OrderByDescending(x => x.CreatedDate)
            .Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();
        return Ok(query);
    }

    [HttpGet("galleries")]
    public async Task<IActionResult> GetGalleries([FromQuery] GalleryFilterOptions filterOptions)
    {
        if (string.IsNullOrWhiteSpace(filterOptions.ApiKey)) return BadRequest("API KEY is required!");
        if (!filterOptions.ApiKey.Equals(Options.OpenApiKey)) return Unauthorized();
        var query = _context.Posts.Where(x => x.Type == PostType.GALLERY)
            .Select(x => new {
                x.Id,
                x.Description,
                x.Title,
                x.Url,
                x.CreatedDate,
                x.ModifiedDate,
                thumbnail = _context.Photos.Where(p => p.PostId == x.Id).Select(p => p.Url).FirstOrDefault()
            });
        var data = await query.OrderByDescending(x => x.ModifiedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();
        return Ok(data);
    }

    [HttpGet("post/{id}"), AllowAnonymous]
    public async Task<IActionResult> PostAsync([FromRoute] string id)
    {
        var post = await _context.Posts.FirstOrDefaultAsync(x => x.Url == id);
        if (post is null) return NoContent();

        var categories = await (from a in _context.PostCategories
                                join b in _context.Categories on a.CategoryId equals b.Id
                                where a.PostId == post.Id
                                select new
                                {
                                    b.Id,
                                    b.Name,
                                    b.NormalizeName,
                                    a.PostId
                                }).ToListAsync();

        var blocks = await (from a in _context.PostBlocks
                            join b in _context.Blocks on a.BlockId equals b.Id
                            where a.PostId == post.Id && a.Active
                            orderby a.SortOrder ascending
                            select new
                            {
                                a.Id,
                                a.Data,
                                b.NormalizedName,
                                b.Name
                            }).ToListAsync();

        var htmlBlock = string.Empty;

        foreach (var item in blocks)
        {
            var data = _blockService.DeserializeObject(item.NormalizedName, item.Data);
            if (data is null)
            {
                continue;
            }
            htmlBlock += await RenderToStringAsync(item.NormalizedName, data);
        }

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
            categories,
            blocks = blocks.Select(x => new
            {
                x.Id,
                x.Name,
                x.NormalizedName,
                data = _blockService.DeserializeObject(x.NormalizedName, x.Data)
            }),
            htmlBlock
        });
    }

    public async Task<string> RenderToStringAsync(string viewName, object model)
    {
        var httpContext = new DefaultHttpContext { RequestServices = _serviceProvider };
        var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());

        using (var sw = new StringWriter())
        {
            var viewResult = _razorViewEngine.GetView("Pages", $"Pages/Components/{viewName}/Default.cshtml", false);

            if (viewResult.View == null)
            {
                throw new ArgumentNullException($"{viewName} does not match any available view");
            }

            var viewDictionary = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary())
            {
                Model = model
            };

            var viewContext = new ViewContext(
                actionContext,
                viewResult.View,
                viewDictionary,
                new TempDataDictionary(actionContext.HttpContext, _tempDataProvider),
                sw,
                new HtmlHelperOptions()
            );

            await viewResult.View.RenderAsync(viewContext);
            return sw.ToString();
        }
    }

    #region Q&A
    [HttpGet("qa-groups")]
    public async Task<IActionResult> AllQaGroupAsync()
    {
        return Ok(await _context.QaGroups.Where(x => x.Active).OrderBy(x => x.SortOrder).Select(x => new
        {
            x.Id,
            x.Title,
            x.CreatedDate,
            x.ModifiedDate
        }).ToListAsync());
    }

    [HttpGet("qa-items/{id}")]
    public async Task<IActionResult> GetQaItemsAsync([FromRoute] Guid id)
    {
        return Ok(await _context.QaItems.Where(i => i.QaGroupId == id).OrderBy(i => i.SortOrder).Select(i => new
        {
            i.Id,
            i.Answer,
            i.Question,
            i.CreatedDate,
            i.ModifiedDate
        }).ToListAsync());
    }
    #endregion

}
