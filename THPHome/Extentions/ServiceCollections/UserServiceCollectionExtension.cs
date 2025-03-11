using THPHome.Interfaces.IService.IUsers;
using THPHome.Services.Users;

namespace THPHome.Extentions.ServiceCollections;

public static class UserServiceCollectionExtension
{
    public static IServiceCollection AddUserService(this IServiceCollection services)
    {
        services.AddScoped<IAcademicTitleService, AcademicTitleService>();
        services.AddScoped<IAcademicDegreeService, AcademicDegreeService>();
        return services;
    }
}
