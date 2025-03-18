using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class AchievementRepository(ApplicationDbContext context) : EfRepository<Achievement>(context), IAchievementRepository
{
}
