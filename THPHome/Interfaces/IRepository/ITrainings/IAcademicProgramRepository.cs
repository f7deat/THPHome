using THPCore.Interfaces;
using THPHome.Entities.Curriculum;
using THPHome.Models.Results.Curriculum.AcademicPrograms;

namespace THPHome.Interfaces.IRepository.ITrainings;

public interface IAcademicProgramRepository : IAsyncRepository<AcademicProgram>
{
    Task<IEnumerable<AllAcademicProgramListResult>> GetAllHighQualityProgramAsync();
}
