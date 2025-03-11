using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.ComponentModel;

namespace THPHome.Services.Users;

public class AcademicTitleService(ApplicationDbContext _context) : IAcademicTitleService
{
    public async Task<IEnumerable<SelectOption>> GetOptionsAsync()
    {
        return await _context.AcademicTitles.Select(x => new SelectOption
        {
            Label = x.Name,
            Value = x.Id
        }).ToListAsync();
    }
}
