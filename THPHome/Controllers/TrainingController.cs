using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Models.Filters.Curriculum;
using WebUI.Foundations;
using WebUI.Models.ViewModel;

namespace THPHome.Controllers;

public class TrainingController(ApplicationDbContext context) : BaseController(context)
{
    #region Training Group
    [HttpGet("group/list"), AllowAnonymous]
    public async Task<IActionResult> GetListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _context.TrainingGroups where a.Active select a;
        return Ok(await ListResult<object>.Success(query.OrderBy(x => x.SortOrder), filterOptions));
    }

    [HttpGet("group/count"), AllowAnonymous]
    public async Task<IActionResult> CountGroupAsync() => Ok(await _context.TrainingGroups.CountAsync(x => x.Active));

    [HttpGet("group/{id}")]
    public async Task<IActionResult> GetGroupAsync([FromRoute] int id) => Ok(await _context.TrainingGroups.FindAsync(id));
    #endregion

    #region Field Of Study - Lĩnh vực đào tạo
    [HttpGet("field-of-study/count"), AllowAnonymous]
    public async Task<IActionResult> CountFieldOfStudyAsync() => Ok(await _context.FieldOfStudies.CountAsync(x => x.Active));

    [HttpGet("field-of-study/options")]
    public async Task<IActionResult> GetFieldOfStudyOptionsAsync() => Ok(await _context.FieldOfStudies.Where(x => x.Active).OrderBy(x => x.SortOrder).Select(x => new { label = x.Name, value = x.Id }).AsNoTracking().ToListAsync());

    [HttpGet("field-of-study/list"), AllowAnonymous]
    public async Task<IActionResult> GetFieldOfStudyListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = from a in _context.FieldOfStudies
                    where a.Active
                    select a;
        return Ok(await ListResult<dynamic>.Success(query.OrderBy(x => x.SortOrder), filterOptions));
    }
    #endregion

    #region Major - Ngành đào tạo
    [HttpGet("major/count"), AllowAnonymous]
    public async Task<IActionResult> CountMajorAsync() => Ok(await _context.Majors.CountAsync(x => x.Active));

    [HttpGet("major/list"), AllowAnonymous]
    public async Task<IActionResult> GetMajorListAsync([FromQuery] MajorFilterOptions filterOptions)
    {
        var query = from a in _context.Majors
                    where a.Active
                    select a;
        if (filterOptions.TrainingGroupId != null)
        {
            query = query.Where(x => x.TrainingGroupId == filterOptions.TrainingGroupId);
        }
        if (filterOptions.FieldStudyId != null)
        {
            query = query.Where(x => x.FieldOfStudyId == filterOptions.FieldStudyId);
        }
        return Ok(await ListResult<object>.Success(query.OrderBy(x => x.SortOrder), filterOptions));
    }

    [HttpGet("major/options")]
    public async Task<IActionResult> GetMajorOptionsAsync() => Ok(await _context.Majors.Where(x => x.Active).OrderBy(x => x.SortOrder).Select(x => new { label = x.Name, value = x.Id }).AsNoTracking().ToListAsync());
    #endregion
}
