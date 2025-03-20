
using THPHome.Models.Results.Curriculum.Majors;

namespace THPHome.Interfaces.IService.ITrainings;

public interface IMajorService
{
    Task<IEnumerable<HighQualityProgramMajorListItem>> GetAllHighQualityProgramAsync();
}
