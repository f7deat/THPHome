using ApplicationCore.Enums;
using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Curriculum;
using THPHome.Models.Filters.Curriculum;
using THPHome.Models.Results.Curriculum;
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

    [HttpGet("group/all"), AllowAnonymous]
    public async Task<IActionResult> GetAllAsync()
    {
        var trainingGroups = await _context.TrainingGroups.Where(x => x.Active).OrderBy(x => x.SortOrder).AsNoTracking().ToListAsync();
        var results = new List<AllTrainingGroupResult>();

        var majors = await _context.Majors.OrderBy(x => x.SortOrder).AsNoTracking().ToListAsync();

        foreach (var trainingGroup in trainingGroups)
        {
            results.Add(new AllTrainingGroupResult
            {
                Id = trainingGroup.Id,
                Name = trainingGroup.Name,
                Description = trainingGroup.Description,
                Thumbnail = trainingGroup.Thumbnail,
                Majors = majors.Where(x => x.TrainingGroupId == trainingGroup.Id).ToList()
            });
        }
        return Ok(results);
    }

    [HttpGet("group/count"), AllowAnonymous]
    public async Task<IActionResult> CountGroupAsync() => Ok(await _context.TrainingGroups.CountAsync(x => x.Active));

    [HttpGet("group/{id}"), AllowAnonymous]
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
    public async Task<IActionResult> CountMajorAsync() => Ok(await _context.Majors.CountAsync(x => x.Active && !x.IsHighQualityProgram));

    [HttpGet("major/{id}"), AllowAnonymous]
    public async Task<IActionResult> GetMajorAsync([FromRoute] int id) => Ok(new { data = await _context.Majors.FindAsync(id) });

    [HttpGet("major/list"), AllowAnonymous]
    public async Task<IActionResult> GetMajorListAsync([FromQuery] MajorFilterOptions filterOptions)
    {
        try
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
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("major/list-with-academic-program"), AllowAnonymous]
    public async Task<IActionResult> GetAllMajorAsync([FromQuery] int trainingGroupId)
    {
        var majors = await _context.Majors.Where(x => x.Active && x.TrainingGroupId == trainingGroupId).OrderBy(x => x.SortOrder).AsNoTracking().ToListAsync();
        var results = new List<AllMajorResult>();
        var academicPrograms = await (from a in _context.AcademicPrograms
                                      join b in _context.Posts on a.PostId equals b.Id
                                      where b.Status == PostStatus.PUBLISH
                                      orderby a.SortOrder ascending
                                      select new
                                      {
                                          a.Id,
                                          b.Title,
                                          a.MajorId,
                                          b.Description,
                                          b.Thumbnail,
                                          a.Code,
                                          b.View,
                                          b.Url
                                      }).AsNoTracking().ToListAsync();
        foreach (var major in majors)
        {
            results.Add(new AllMajorResult
            {
                Id = major.Id,
                Name = major.Name,
                Description = major.Description,
                Thumbnail = major.Thumbnail,
                AcademicPrograms = [.. academicPrograms.Where(x => x.MajorId == major.Id).Select(x => new AcademicProgramResult
                {
                    Id = x.Id,
                    Name = x.Title,
                    Description = x.Description,
                    Thumbnail = x.Thumbnail,
                    Code = x.Code,
                    ViewCount = x.View,
                    Url = x.Url
                })]
            });
        }
        return Ok(results);
    }

    [HttpGet("major/options")]
    public async Task<IActionResult> GetMajorOptionsAsync() => Ok(await _context.Majors.Where(x => x.Active).OrderBy(x => x.SortOrder).Select(x => new { label = x.Name, value = x.Id }).AsNoTracking().ToListAsync());
    #endregion

    #region Academic Program - Chương trình đào tạo
    [HttpGet("academic-program/all-by-major-id/{id}"), AllowAnonymous]
    public async Task<IActionResult> AllAcademicProgramAsync([FromRoute] int id)
    {
        var academicPrograms = await (from a in _context.AcademicPrograms
                                      join b in _context.Posts on a.PostId equals b.Id
                                      where b.Status == PostStatus.PUBLISH && a.MajorId == id
                                      orderby a.SortOrder ascending
                                      select new
                                      {
                                          a.Id,
                                          b.Title,
                                          a.MajorId,
                                          b.Description,
                                          b.Thumbnail,
                                          a.Code,
                                          b.View,
                                          b.Url
                                      }).AsNoTracking().ToListAsync();
        return Ok(academicPrograms);
    }

    public async Task<IActionResult> ListAcademicProgramAsync([FromQuery] AcademicProgramFilterOptions filterOptions)
    {
        var query = from a in _context.AcademicPrograms
                    join b in _context.Posts on a.PostId equals b.Id
                    select new
                    {
                        a.Id,
                        b.Title,
                        a.MajorId,
                        b.Description,
                        b.Thumbnail,
                        a.Code,
                        b.View,
                        b.Url,
                        b.Status,
                        a.SortOrder
                    };
        if (filterOptions.MajorId != null)
        {
            query = query.Where(x => x.MajorId == filterOptions.MajorId);
        }
        return Ok(await ListResult<object>.Success(query.OrderBy(x => x.Id), filterOptions));
    }
    #endregion
}
