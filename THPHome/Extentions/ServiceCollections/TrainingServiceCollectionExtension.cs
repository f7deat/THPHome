using THPHome.Interfaces.IRepository.ITrainings;
using THPHome.Interfaces.IService.ITrainings;
using THPHome.Repositories.Trainings;
using THPHome.Services.Trainings;

namespace THPHome.Extentions.ServiceCollections;

public static class TrainingServiceCollectionExtension
{
    public static IServiceCollection AddTrainingService(this IServiceCollection services)
    {
        // Ngành/Chuyên ngành
        services.AddScoped<IMajorRepository, MajorRepository>();
        services.AddScoped<IMajorService, MajorService>();

        // Chương trình đào tạo
        services.AddScoped<IAcademicProgramRepository, AcademicProgramRepository>();
        services.AddScoped<IAcademicProgramService, AcademicProgramService>();

        return services;
    }
}
