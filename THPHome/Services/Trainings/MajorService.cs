using THPHome.Interfaces.IRepository.ITrainings;
using THPHome.Interfaces.IService.ITrainings;
using THPHome.Models.Results.Curriculum.Majors;

namespace THPHome.Services.Trainings;

public class MajorService(IMajorRepository _majorRepository) : IMajorService
{
    public Task<IEnumerable<HighQualityProgramMajorListItem>> GetAllHighQualityProgramAsync() => _majorRepository.GetAllHighQualityProgramAsync();
}
