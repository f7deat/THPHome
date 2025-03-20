using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Curriculum;
using THPHome.Interfaces.IRepository.ITrainings;
using THPHome.Models.Results.Curriculum.Majors;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Trainings;

public class MajorRepository(ApplicationDbContext context) : EfRepository<Major>(context), IMajorRepository
{
    public async Task<IEnumerable<HighQualityProgramMajorListItem>> GetAllHighQualityProgramAsync()
    {
        var query = from a in _context.Majors
                    join b in _context.Posts on a.PostId equals b.Id
                    where a.IsHighQualityProgram
                    select new HighQualityProgramMajorListItem
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Url = b.Url
                    };
        return await query.AsNoTracking().ToListAsync();
    }
}
