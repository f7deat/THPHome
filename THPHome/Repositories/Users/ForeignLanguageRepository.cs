using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class ForeignLanguageRepository(ApplicationDbContext context) : EfRepository<ForeignLanguageProficiency>(context), IForeignLanguageRepository
{
}
