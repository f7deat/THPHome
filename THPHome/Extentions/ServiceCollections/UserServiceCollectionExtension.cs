using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Repositories.Users;
using THPHome.Services.Users;

namespace THPHome.Extentions.ServiceCollections;

public static class UserServiceCollectionExtension
{
    public static IServiceCollection AddUserService(this IServiceCollection services)
    {
        services.AddScoped<IAcademicTitleService, AcademicTitleService>();
        services.AddScoped<IAcademicDegreeService, AcademicDegreeService>();

        services.AddScoped<ICityService, CityService>();
        services.AddScoped<ICityRepository, CityRepository>();

        services.AddScoped<IAwardService, AwardService>();
        services.AddScoped<IAwardRepository, AwardRepository>();

        services.AddScoped<IEducationHistoryService, EducationHistoryService>();
        services.AddScoped<IEducationHistoryRepository, EducationHistoryRepository>();

        services.AddScoped<IDepartmentRepository, DepartmentRepository>();
        services.AddScoped<IDepartmentService, DepartmentService>();

        return services;
    }
}
