using ApplicationCore.Entities;
using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Api
{
    public class DepartmentController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public DepartmentController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListAsync([FromQuery] FilterOptions filterOptions)
        {
            var query = _context.Departments;
            return Ok(new
            {
                data = await query.OrderByDescending(x => x.ModifiedDate).Skip((filterOptions.PageIndex - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync(),
                total = await query.CountAsync()
            });
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] Department args)
        {
            var user = await _userManager.GetUserAsync(User);
            var department = new Department
            {
                CreatedBy = user.Id,
                CreatedDate = DateTime.Now,
                Description = args.Description,
                ModifiedBy = user.Id,
                ModifiedDate = DateTime.Now,
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
            if (await _context.DeparmentUsers.AnyAsync(x => x.DeparmentId == id))
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
            if (department is null)
            {
                return BadRequest("Department not found!");
            }
            department.Name = args.Name;
            department.Description = args.Description;
            await _context.SaveChangesAsync();
            return Ok(IdentityResult.Success);
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> AddUserAsync([FromBody] DeparmentUser args)
        {
            var department = await _context.Departments.FindAsync(args.DeparmentId);
            if (department is null)
            {
                return BadRequest("Department not found!");
            }
            if (await _context.DeparmentUsers.AnyAsync(x => x.DeparmentId == args.DeparmentId && x.UserId == args.UserId))
            {
                return BadRequest("Người dùng đã tồn tại trong Khoa - Viện!");
            }
            await _context.DeparmentUsers.AddAsync(args);
            await _context.SaveChangesAsync();
            return Ok(IdentityResult.Success);
        }
    }
}
