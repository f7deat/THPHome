using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Extensions;
using WebUI.Foundations;

namespace WebUI.Controllers;

public class DepartmentController : BaseController
{
    private readonly UserManager<ApplicationUser> _userManager;

    public DepartmentController(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : base(context)
    {
        _userManager = userManager;
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync()
    {
        var query = _context.Departments;
        return Ok(new
        {
            data = await query.OrderByDescending(x => x.ModifiedDate).ToListAsync(),
            total = await query.CountAsync()
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] Guid id) => Ok(await _context.Departments.FindAsync(id));

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] Department args)
    {
        var department = new Department
        {
            Description = args.Description,
            Name = args.Name,
        };
        await _context.Departments.AddAsync(department);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
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
        var department = await _context.Departments.FindAsync(args.Id);
        if (department is null) return BadRequest("Department not found!");
        department.Name = args.Name;
        department.Description = args.Description;
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
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

    [HttpPost("add-detail")]
    public async Task<IActionResult> AddDetailAsync([FromBody] DepartmentDetail args)
    {
        if (!await _context.Departments.AnyAsync(x => x.Id == args.DepartmentId))
        {
            return BadRequest("Không tìm thấy Khoa - Viện!");
        }
        await _context.DepartmentDetails.AddAsync(args);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpGet("detail/{id}")]
    public async Task<IActionResult> DetailAsync([FromRoute] Guid id)
    {
        if (!await _context.Departments.AnyAsync(x => x.Id == id))
        {
            return BadRequest("Không tìm thấy Khoa - Viện!");
        }
        var data = await _context.DepartmentDetails.Where(x => x.DepartmentId == id)
            .OrderBy(x => x.SortOrder)
            .Select(x => new
            {
                x.Id,
                x.DepartmentId,
                x.Type,
                x.SortOrder,
                x.ModifiedDate
            })
            .ToListAsync();
        return Ok(data);
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
        user.ModifiedDate = DateTime.Now;
        user.JobTitle = args.JobTitle;
        user.Rank = args.Rank;
        user.Type = args.Type;
        _context.DepartmentUsers.Update(user);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpGet("users-in-department/{id}")]
    public async Task<IActionResult> GetUsersInDepartmentAsync([FromRoute] Guid id)
    {
        var users = from a in _context.Users
                    join b in _context.DepartmentUsers on a.Id equals b.UserId
                    join c in _context.Departments on b.DepartmentId equals c.Id
                    where b.DepartmentId == id
                    select new
                    {
                        b.Id,
                        a.Name,
                        a.Email,
                        b.Rank,
                        b.JobTitle,
                        userId = a.Id,
                        b.Type
                    };
        return Ok(await users.ToListAsync());
    }
}
