using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using WebUI.Foundations;

namespace WebUI.Pages.Departments;

public class IndexModel : EntryPageModel
{
    public IndexModel(ApplicationDbContext context, IPostService postService) : base(postService, context)
    {
    }

    public List<Department> Departments { get; set; } = [];
    public Department Department { get; set; } = new();
    public List<DepartmentDetail> DepartmentDetails { get; set; } = [];
    public Dictionary<int, IEnumerable<UserRank>> UserRanks { get; set; } = [];

    public async Task<IActionResult> OnGetAsync(Guid? id)
    {
        Departments = await _context.Departments.ToListAsync();
        if (id == null)
        {
            var department = Departments.FirstOrDefault();
            if (department != null)
            {
                Department = department;
                id = Department.Id;
            }
        }
        else
        {
            var department = Departments.FirstOrDefault(x => x.Id == id);
            if (department != null)
            {
                Department = department;
            }
        }
        if (Department is null)
        {
            return NotFound();
        }

        DepartmentDetails = await _context.DepartmentDetails
            .Where(x => x.DepartmentId == id)
            .OrderBy(x => x.SortOrder)
            .ToListAsync();
        UserRanks = [];

        return Page();
    }
}

public class UserRank
{
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? JobTitle { get; set; }
    public string? Avatar { get; set; }
    public int Rank { get; set; }
    public string? Group { get; set; }
}
