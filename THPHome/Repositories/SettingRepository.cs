using Infrastructure.Repositories;
using THPHome.Data;
using WebUI.Entities;
using WebUI.Interfaces.IRepository;

namespace WebUI.Repositories;

public class SettingRepository : EfRepository<ApplicationSetting>, ISettingRepository
{
    public SettingRepository(ApplicationDbContext context) : base(context)
    {
    }
}
