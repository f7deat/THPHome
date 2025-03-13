using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class DepartmentRepository(ApplicationDbContext context) : EfRepository<Department>(context), IDepartmentRepository
{
    public async Task<IEnumerable<SelectOption>> GetCodeOptionsAsync()
    {
        return await _context.Departments.Where(x => x.Code != null).Select(x => new SelectOption
        {
            Label = x.Name,
            Value = x.Code
        }).ToListAsync();
    }
}
