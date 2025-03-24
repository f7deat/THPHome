using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Interfaces.IService.ILeaves;
using THPHome.Repositories.Leaves;
using THPHome.Services.Leaves;

namespace THPHome.Extentions.ServiceCollections;

public static class LeaveServiceCollectionExtension
{
    public static IServiceCollection AddLeaveService(this IServiceCollection services)
    {
        services.AddScoped<ILeaveRequestRepository, LeaveRequestRepository>();
        services.AddScoped<ILeaveRequestService, LeaveRequestService>();

        services.AddScoped<ILeaveBalanceRepository, LeaveBalanceRepository>();
        services.AddScoped<ILeaveBalanceService, LeaveBalanceService>();

        services.AddScoped<ILeaveTypeRepository, LeaveTypeRepository>();
        services.AddScoped<ILeaveTypeService, LeaveTypeService>();

        return services;
    }
}
