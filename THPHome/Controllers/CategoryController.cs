using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPIdentity.Entities;
using WebUI.Foundations;
using WebUI.Models.Categories;
using WebUI.Models.Filters;
using WebUI.Models.Results;

namespace THPHome.Controllers;

public class CategoryController : BaseController
{
    private readonly ICategoryService _categoryService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IPostService _postService;

    public CategoryController(ICategoryService categoryService, UserManager<ApplicationUser> userManager, ApplicationDbContext context, IPostService postService) : base(context)
    {
        _categoryService = categoryService;
        _userManager = userManager;
        _postService = postService;
    }

    [HttpGet("parent/options")]
    public async Task<IActionResult> GetParentOptionsAsync([FromQuery] Language language) => Ok(await _context.Categories.Where(x => x.ParrentId == null && x.Language == language).Select(x => new
    {
        label = x.Name,
        value = x.Id
    }).ToListAsync());

    [HttpGet("posts")]
    public async Task<IActionResult> GetPostsAsync([FromQuery] PostInCategoryFilterOptions filterOptions) => Ok(await _postService.GetInCategoryAsync(filterOptions));

    [HttpGet("list")]
    public async Task<IActionResult> GetListAsync([FromQuery] CategoryFilterOptions filterOptions)
    {
        var result = new List<TreeCategoryItem>();
        var raw = await _context.Categories
            .Where(x => x.Language == filterOptions.Language)
            .Where(x => string.IsNullOrEmpty(filterOptions.Name) || !string.IsNullOrEmpty(x.Name) && x.Name.ToLower().Contains(filterOptions.Name.ToLower()))
            .Select(x => new TreeCategoryItem
            {
                ParentId = x.ParrentId,
                Name = x.Name,
                Id = x.Id,
                Description = x.Description,
                Status = x.Status,
                Count = _context.PostCategories.Count(c => c.CategoryId == x.Id),
                IsDisplayOnHome = x.IsDisplayOnHome
            }).ToListAsync();
        var categories = raw.Where(x => x.ParentId == null || x.ParentId == 0)
            .Select(x => new TreeCategoryItem
            {
                ParentId = x.ParentId,
                Name = x.Name,
                Id = x.Id,
                Description = x.Description,
                Status = x.Status,
                Count = x.Count,
                IsDisplayOnHome = x.IsDisplayOnHome
            });
        foreach (var category in categories)
        {
            result.Add(new TreeCategoryItem
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Children = GetTreeDataItem(category.Id, raw),
                Status = category.Status,
                Count = category.Count,
                IsDisplayOnHome = category.IsDisplayOnHome
            });
        }
        return Ok(new
        {
            data = result,
            total = result.Count
        });
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Category category) => CreatedAtAction(nameof(AddAsync), await _categoryService.AddAsync(category));

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category is null) return BadRequest("Data not found!");
        return Ok(await _categoryService.DeleteAsync(id));
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Category category)
    {
        var data = await _context.Categories.FindAsync(category.Id);
        if (data is null) return BadRequest("Data not found!");
        data.IsDisplayOnHome = category.IsDisplayOnHome;
        data.Description = category.Description;
        data.Icon = category.Icon;
        data.Index = category.Index;
        data.Name = category.Name;
        data.ParrentId = category.ParrentId;
        data.NormalizeName = category.NormalizeName;
        data.Thumbnail = category.Thumbnail;
        return Ok(await _categoryService.UpdateAsync(data));
    }

    [HttpPost("active")]
    public async Task<IActionResult> ActiveAsync([FromBody] Category category)
    {
        var data = await _context.Categories.FindAsync(category.Id);
        if (data is null) return BadRequest("Data not found!");
        data.Status = category.Status;
        return Ok(await _categoryService.UpdateAsync(data));
    }

    private static IEnumerable<TreeCategoryData>? GetTreeData(int? parentId, List<Category> raw)
    {
        var result = default(IEnumerable<TreeCategoryData>);
        if (parentId == null || parentId == 0) return result;
        var categories = raw.Where(x => x.ParrentId == parentId).Select(x => new TreeCategoryData
        {
            Value = x.Id,
            Title = x.Name
        });
        if (!categories.Any()) return result;
        foreach (var category in categories)
        {
            category.Children = GetTreeData(category.Value, raw);
        }
        return categories;
    }

    private static IEnumerable<TreeCategoryItem>? GetTreeDataItem(int? parentId, List<TreeCategoryItem> raw)
    {
        var result = default(IEnumerable<TreeCategoryItem>);
        if (parentId == null || parentId == 0) return result;
        var categories = raw.Where(x => x.ParentId == parentId).Select(x => new TreeCategoryItem
        {
            Id = x.Id,
            Name = x.Name,
            Description = x.Description,
            Status = x.Status,
            Count = x.Count
        });
        if (!categories.Any()) return result;
        foreach (var category in categories)
        {
            category.Children = GetTreeDataItem(category.Id, raw);
        }
        return categories;
    }

    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync([FromQuery] CategorySelectFilterOptions args)
    {
        var result = new List<TreeCategoryData>();
        var raw = await _context.Categories.Where(x => x.Status == CategoryStatus.Active).Where(x => x.Language == args.Language).ToListAsync();
        var categories = raw.Where(x => x.ParrentId == null || x.ParrentId == 0)
            .Select(x => new
            {
                x.ParrentId,
                x.Name,
                x.Id
            });
        foreach (var category in categories)
        {
            result.Add(new TreeCategoryData
            {
                Value = category.Id,
                Title = category.Name,
                Children = GetTreeData(category.Id, raw)
            });
        }
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category is null) return BadRequest("Data not found!");
        return Ok(new
        {
            category.Id,
            category.Name,
            category.Description,
            category.Status,
            category.Language,
            ParentId = category.ParrentId,
            category.NormalizeName,
            category.IsDisplayOnHome,
            category.Icon,
            category.Thumbnail
        });
    }
}
