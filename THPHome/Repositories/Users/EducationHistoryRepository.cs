using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class EducationHistoryRepository(ApplicationDbContext context) : EfRepository<EducationHistory>(context), IEducationHistoryRepository
{
}
