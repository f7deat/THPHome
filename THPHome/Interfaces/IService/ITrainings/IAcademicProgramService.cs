
using THPHome.Models.Results.Curriculum.AcademicPrograms;

namespace THPHome.Interfaces.IService.ITrainings;

public interface IAcademicProgramService
{
    Task<IEnumerable<AllAcademicProgramListResult>> GetAllHighQualityProgramAsync();
}
