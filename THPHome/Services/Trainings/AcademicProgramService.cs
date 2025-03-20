using THPHome.Interfaces.IRepository.ITrainings;
using THPHome.Interfaces.IService.ITrainings;
using THPHome.Models.Results.Curriculum.AcademicPrograms;

namespace THPHome.Services.Trainings;

public class AcademicProgramService(IAcademicProgramRepository _academicProgramRepository) : IAcademicProgramService
{
    public Task<IEnumerable<AllAcademicProgramListResult>> GetAllHighQualityProgramAsync() => _academicProgramRepository.GetAllHighQualityProgramAsync();
}
