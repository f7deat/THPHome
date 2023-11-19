using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Pages.Departments
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Department> Departments { get; set; }
        public Department Department { get; set; }
        public List<DepartmentDetail> DepartmentDetails { get; set; }
        public Dictionary<string, IEnumerable<UserRank>> UserRanks { get; set; }

        public async Task<IActionResult> OnGetAsync(Guid? id, DepartmentType type = DepartmentType.Faculty)
        {
            Departments = await _context.Departments.ToListAsync();
            if (id == null)
            {
                Department = await _context.Departments.FirstOrDefaultAsync();
            }
            else
            {
                Department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            }
            if (Department is null)
            {
                return NotFound();
            }

            DepartmentDetails = await _context.DepartmentDetails
                .Where(x => x.DepartmentId == id)
                .OrderBy(x => x.SortOrder)
                .ToListAsync();

            var query = await (from u in _context.Users
                               join du in _context.DepartmentUsers on u.Id equals du.UserId
                               join d in _context.Departments on du.DepartmentId equals d.Id
                               where du.DepartmentId == id && !string.IsNullOrEmpty(du.Type) && d.Type == type
                               orderby du.Rank
                               select new UserRank
                               {
                                   Id = u.Id,
                                   Name = u.Name,
                                   Email = u.Email,
                                   JobTitle = u.JobTitle,
                                   Avatar = u.Avatar,
                                   Rank = du.Rank,
                                   Group = du.Type
                               }).ToListAsync();
            UserRanks = query.GroupBy(x => x.Group).ToDictionary(x => x.Key, x => x.Select(y => new UserRank
            {
                Avatar = y.Avatar,
                Rank = y.Rank,
                Email = y.Email,
                JobTitle = y.JobTitle,
                Id = y.Id,
                Name = y.Name
            }));

            return Page();
        }
    }

    public class UserRank
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
        public string Avatar { get; set; }
        public int Rank { get; set; }
        public string Group { get; set; }
    }
}
