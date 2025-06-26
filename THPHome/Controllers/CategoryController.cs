using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPHome.Models.Categories;
using THPHome.Models.Filters;
using THPIdentity.Constants;
using THPIdentity.Entities;
using WebUI.Models.Results;

namespace THPHome.Controllers;

public class CategoryController(ICategoryService _categoryService, ApplicationDbContext context, IPostService _postService, IHCAService _hcaService, UserManager<ApplicationUser> _userManager) : BaseController(context)
{
    [HttpGet("parent/options")]
    public async Task<IActionResult> GetParentOptionsAsync([FromQuery] string locale) => Ok(await _context.Categories.Where(x => x.ParentId == null && x.Locale == locale).Select(x => new
    {
        label = x.Name,
        value = x.Id
    }).ToListAsync());

    [HttpGet("posts"), AllowAnonymous]
    public async Task<IActionResult> GetPostsAsync([FromQuery] PostInCategoryFilterOptions filterOptions) => Ok(await _postService.GetInCategoryAsync(filterOptions));

    [HttpGet("list")]
    public async Task<IActionResult> GetListAsync([FromQuery] CategoryFilterOptions filterOptions)
    {
        var result = new List<TreeCategoryItem>();
        var query = _context.Categories
            .Where(x => x.Locale == filterOptions.Locale)
            .Where(x => string.IsNullOrEmpty(filterOptions.Name) || !string.IsNullOrEmpty(x.Name) && x.Name.ToLower().Contains(filterOptions.Name.ToLower()))
            .Select(x => new TreeCategoryItem
            {
                ParentId = x.ParentId,
                Name = x.Name,
                Id = x.Id,
                Description = x.Description,
                Status = x.Status,
                Count = _context.Posts.Count(c => c.CategoryId == x.Id),
                IsDisplayOnHome = x.IsDisplayOnHome,
                DepartmentId = x.DepartmentId,
                Index = x.Index
            });

        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return BadRequest("User not found!");
        if (!_hcaService.IsUserInAnyRole(RoleName.ADMIN, RoleName.EDITOR))
        {
            query = query.Where(x => x.DepartmentId == user.DepartmentId);
        }
        else
        {
            query = query.Where(x => x.DepartmentId == null);
        }

        var raw = await query.AsNoTracking().ToListAsync();

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
    public async Task<IActionResult> AddAsync([FromBody] Category category, [FromQuery] string locale)
    {
        var result = await _categoryService.AddAsync(category, locale);
        if (!result.Succeeded) return BadRequest(result.Message);
        return CreatedAtAction(nameof(AddAsync), result);
    }

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
        data.ParentId = category.ParentId;
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
        var categories = raw.Where(x => x.ParentId == parentId).Select(x => new TreeCategoryData
        {
            Value = x.Id,
            Label = x.Name
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
    public async Task<IActionResult> GetOptionsAsync([FromQuery] FilterOptions args)
    {
        var result = new List<TreeCategoryData>();
        var query = _context.Categories.Where(x => x.Status == CategoryStatus.Active).Where(x => x.Locale == args.Locale);
        var user = await _userManager.FindByIdAsync(_hcaService.GetUserId());
        if (user is null) return BadRequest("User not found!");
        if (_hcaService.IsUserInAnyRole(RoleName.ADMIN, RoleName.EDITOR))
        {
            query = query.Where(x => x.DepartmentId == null);
        }
        else
        {
            query = query.Where(x => x.DepartmentId == user.DepartmentId);
        }
        var raw = await query.AsNoTracking().ToListAsync();
        var categories = raw.Where(x => x.ParentId == null || x.ParentId == 0)
            .Select(x => new
            {
                x.ParentId,
                x.Name,
                x.Id
            });
        foreach (var category in categories)
        {
            result.Add(new TreeCategoryData
            {
                Value = category.Id,
                Label = category.Name,
                Children = GetTreeData(category.Id, raw)
            });
        }
        return Ok(result);
    }

    [HttpGet("all-options")]
    public async Task<IActionResult> AllOptionsAsync([FromQuery] string locale) => Ok(await _context.Categories.Where(x => x.Status == CategoryStatus.Active && x.Locale == locale).Select(x => new
    {
        value = x.Id,
        label = x.Name
    }).ToListAsync());

    [HttpGet("{id}"), AllowAnonymous]
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
            category.Locale,
            category.ParentId,
            category.NormalizeName,
            category.IsDisplayOnHome,
            category.Icon,
            category.Thumbnail,
            category.Index
        });
    }
}
