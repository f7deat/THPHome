using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebUI.Foundations;
using WebUI.Models.Filters;
using WebUI.Models.Results;

namespace WebUI.Controllers;

public class CategoryController : BaseController
{
    private readonly ICategoryService _categoryService;
    private readonly UserManager<ApplicationUser> _userManager;

    public CategoryController(ICategoryService categoryService, UserManager<ApplicationUser> userManager, ApplicationDbContext context) : base(context)
    {
        _categoryService = categoryService;
        _userManager = userManager;
    }

    [Route("get-list/{id}")]
    public async Task<IActionResult> GetListAsyc([FromRoute] int id, [FromQuery] Language language)
    {
        return Ok(await _categoryService.GetListAsyc(id, language));
    }

    [Route("get-list")]
    public async Task<IActionResult> GetListAsync([FromQuery] Language language)
    {
        return Ok(await _categoryService.ListAllAsync(language));
    }

    [Route("add"), HttpPost]
    public async Task<IActionResult> AddAsync([FromBody] Category category)
    {
        return CreatedAtAction(nameof(AddAsync), await _categoryService.AddAsync(category));
    }

    [Route("delete/{id}"), HttpPost]
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

    private IEnumerable<TreeCategoryData>? GetTreeData(int? parentId, List<Category> raw)
    {
        var result = default(IEnumerable<TreeCategoryData>);
        if (parentId == null || parentId == 0) return result;
        var categories = raw.Where(x => x.ParrentId == parentId).Select(x => new TreeCategoryData
        {
            Value = x.Id,
            Title = x.Name
        });
        if (categories.IsNullOrEmpty()) return result;
        foreach (var category in categories)
        {
            category.Children = GetTreeData(category.Value, raw);
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
}
