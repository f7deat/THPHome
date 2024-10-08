using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Foundations;

namespace WebUI.Pages.Departments;

public class IndexModel : EntryPageModel
{
    public IndexModel(ApplicationDbContext context, IPostService postService) : base(postService, context)
    {
    }

    public List<Department> Departments { get; set; }
    public Department Department { get; set; }
    public List<DepartmentDetail> DepartmentDetails { get; set; }
    public Dictionary<int, IEnumerable<UserRank>> UserRanks { get; set; }

    public async Task<IActionResult> OnGetAsync(Guid? id, int type)
    {
        Departments = await _context.Departments.Where(x => x.DepartmentTypeId == type).ToListAsync();
        if (id == null)
        {
            Department = Departments.FirstOrDefault(x => x.DepartmentTypeId == type);
            id = Department.Id;
        }
        else
        {
            Department = Departments.FirstOrDefault(x => x.Id == id);
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
                           where du.DepartmentId == id && !string.IsNullOrEmpty(du.Type) && d.DepartmentTypeId == type
                           orderby du.Rank
                           select new UserRank
                           {
                               Id = u.Id,
                               Name = u.Name,
                               Email = u.Email,
                               JobTitle = du.JobTitle,
                               Avatar = u.Avatar,
                               Rank = du.Rank,
                               Group = du.Type
                           }).ToListAsync();
        UserRanks = query.GroupBy(x => x.Rank).ToDictionary(x => x.Key, x => x.Select(y => new UserRank
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
