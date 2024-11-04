using ApplicationCore.Interfaces;
using WebUI.Entities;

namespace WebUI.Interfaces.IRepository;

public interface ISettingRepository : IAsyncRepository<ApplicationSetting>
{
}
