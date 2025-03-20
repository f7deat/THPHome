using THPHome.Entities.Curriculum;
using THPHome.Interfaces.Base;
using THPHome.Models.Results.Curriculum.Majors;

namespace THPHome.Interfaces.IRepository.ITrainings;

public interface IMajorRepository : IAsyncRepository<Major>
{
    Task<IEnumerable<HighQualityProgramMajorListItem>> GetAllHighQualityProgramAsync();
}
