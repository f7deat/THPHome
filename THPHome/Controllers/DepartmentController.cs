using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.Filters;
using THPHome.Models.Filters.Users;
using THPHome.Models.ViewModel;
using THPIdentity.Entities;
using WebUI.Foundations;
using WebUI.Models.Args.Departments;

namespace THPHome.Controllers;

public class DepartmentController(ApplicationDbContext context, UserManager<ApplicationUser> _userManager, IDepartmentService _departmentService) : BaseController(context)
{
    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] DepartmentFilterOptions filterOptions)
    {
        var query = from a in _context.Departments
                    where a.Locale == filterOptions.Locale
                    select new
                    {
                        a.DepartmentTypeId,
                        a.ModifiedDate,
                        a.Id,
                        a.Name,
                        a.Description,
                        a.CreatedDate,
                        a.CreatedBy,
                        a.ModifiedBy
                    };
        if (filterOptions.DepartmentTypeId != null)
        {
            query = query.Where(x => x.DepartmentTypeId == filterOptions.DepartmentTypeId);
        }
        query = query.OrderByDescending(x => x.ModifiedDate);
        return Ok(await ListResult<object>.Success(query, filterOptions));
    }

    [HttpGet("all"), AllowAnonymous]
    public async Task<IActionResult> AllAsync() => Ok(await _context.Departments.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] Guid id) => Ok(await _context.Departments.FindAsync(id));

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Department args)
    {
        try
        {
            var department = new Department
            {
                Description = args.Description,
                Name = args.Name,
                Locale = args.Locale,
                CreatedDate = DateTime.Now,
                CreatedBy = User.GetId(),
                DepartmentTypeId = args.DepartmentTypeId
            };
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
            return Ok(IdentityResult.Success);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("remove/{id}")]
    public async Task<IActionResult> RemoveAsync([FromRoute] Guid id)
    {
        var deparment = await _context.Departments.FindAsync(id);
        if (deparment is null)
        {
            return BadRequest("Department not found!");
        }
        if (await _context.DepartmentUsers.AnyAsync(x => x.DepartmentId == id))
        {
            return BadRequest("Deparment has user!");
        }
        _context.Departments.Remove(deparment);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] Department args)
    {
        try
        {
            var department = await _context.Departments.FindAsync(args.Id);
            if (department is null) return BadRequest("Department not found!");
            department.Name = args.Name;
            department.Description = args.Description;
            department.Code = args.Code;
            department.ModifiedDate = DateTime.Now;
            department.ModifiedBy = User.GetId();
            department.DepartmentTypeId = args.DepartmentTypeId;
            if (!await _context.DepartmentTypes.AnyAsync(x => x.Id == args.DepartmentTypeId)) return BadRequest("Không tìm thấy loại đơn vị!");
            _context.Departments.Update(department);
            await _context.SaveChangesAsync();
            return Ok(IdentityResult.Success);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("add-user")]
    public async Task<IActionResult> AddUserAsync([FromBody] DepartmentUser args)
    {
        var department = await _context.Departments.FindAsync(args.DepartmentId);
        if (department is null) return BadRequest("Department not found!");
        await _context.DepartmentUsers.AddAsync(args);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("remove-user/{id}")]
    public async Task<IActionResult> RemoveUserAsync([FromRoute] Guid id)
    {
        var user = await _context.DepartmentUsers.FindAsync(id);
        if (user is null) return BadRequest("Department not found!");
        _context.DepartmentUsers.Remove(user);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpGet("detail/content/{id}")]
    public async Task<IActionResult> GetDetailContent([FromRoute] Guid id) => Ok(await _context.DepartmentDetails.FindAsync(id));

    [HttpPost("detail/delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var detail = await _context.DepartmentDetails.FindAsync(id);
        if (detail == null)
        {
            return BadRequest("Data not found!");
        }
        _context.DepartmentDetails.Remove(detail);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("update-detail")]
    public async Task<IActionResult> UpdateDetailAsync([FromBody] DepartmentDetail args)
    {
        var detail = await _context.DepartmentDetails.FindAsync(args.Id);
        if (detail is null) return BadRequest("Data not found!");
        var user = await _userManager.FindByIdAsync(User.GetId());
        if (user is null) return BadRequest("User not found!");
        detail.Content = args.Content;
        detail.Type = args.Type;
        detail.ModifiedDate = DateTime.Now;
        detail.ModifiedBy = user.Id;
        detail.SortOrder = args.SortOrder;
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("update-user")]
    public async Task<IActionResult> UpdateUserAsync([FromBody] DepartmentUser args)
    {
        var user = await _context.DepartmentUsers.FindAsync(args.Id);
        if (user is null)
        {
            return BadRequest("Data not found");
        }
        user.JobTitle = args.JobTitle;
        user.Rank = args.Rank;
        user.Type = args.Type;
        _context.DepartmentUsers.Update(user);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpGet("types")]
    public async Task<IActionResult> GetTypesAsync([FromQuery] FilterOptions filterOptions) => Ok(new { data = await _context.DepartmentTypes.Where(x => x.Locale == filterOptions.Locale).ToListAsync() });

    [HttpGet("type/options")]
    public async Task<IActionResult> GetTypeOptionsAsync([FromQuery] FilterOptions filterOptions) => Ok(await _context.DepartmentTypes.Where(x => x.Locale == filterOptions.Locale).Select(x => new
    {
        label = x.Name,
        value = x.Id
    }).ToListAsync());

    [HttpGet("code-options"), AllowAnonymous]
    public async Task<IActionResult> GetCodeOptionsAsync() => Ok(await _departmentService.GetOptionsAsync());

    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync() => Ok(await _departmentService.GetOptionsAsync());

    [HttpGet("users")]
    public async Task<IActionResult> UsersAsync([FromQuery] DepartmentUserFilterOptions filterOptions) => Ok(await _departmentService.UsersAsync(filterOptions));
}
