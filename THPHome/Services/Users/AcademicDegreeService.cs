using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Models.ComponentModel;

namespace THPHome.Services.Users;

public class AcademicDegreeService(ApplicationDbContext _context) : IAcademicDegreeService
{
    public async Task<IEnumerable<SelectOption>> GetOptionsAsync() => await _context.AcademicDegrees.Select(x => new SelectOption
    {
        Label = x.Name,
        Value = x.Id
    }).ToListAsync();
}
