using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Curriculum;
using THPHome.Enums;
using THPHome.Interfaces.IRepository.ITrainings;
using THPHome.Models.Results.Curriculum.AcademicPrograms;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Trainings;

public class AcademicProgramRepository(ApplicationDbContext context) : EfRepository<AcademicProgram>(context), IAcademicProgramRepository
{
    public async Task<IEnumerable<AllAcademicProgramListResult>> GetAllHighQualityProgramAsync()
    {
        var query = from a in _context.AcademicPrograms
                    join b in _context.Posts on a.PostId equals b.Id
                    join c in _context.Majors on a.MajorId equals c.Id
                    where c.IsHighQualityProgram && b.Status == PostStatus.PUBLISH
                    select new AllAcademicProgramListResult
                    {
                        Id = a.Id,
                        Name = b.Title,
                        Url = b.Url
                    };
        return await query.ToListAsync();
    }
}
