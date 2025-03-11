using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Repositories;
using ApplicationCore.Services;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebUI.Options;
using WebUI.Interfaces.IService;
using WebUI.Services;
using WebUI.Interfaces.IRepository;
using WebUI.Repositories;
using WebUI.ExternalAPI.Interfaces;
using WebUI.ExternalAPI;
using WebUI.Foundations.Interfaces;
using WebUI.Foundations;
using THPCore.Interfaces;
using THPCore.Senders;
using THPIdentity.Data;
using THPIdentity.Entities;
using THPHome.Data;
using THPHome.Interfaces.IService;
using THPHome.Services;
using THPHome.Repositories;
using THPHome.Repositories.Base;
using THPHome.Interfaces.Base;
using THPHome.ExternalAPI;
using THPHome.Interfaces.IRepository;
using THPCore.Services;
using THPHome.Services.Contacts;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Services.Users;
using THPHome.Extentions.ServiceCollections;

namespace THPHome;

public class Startup(IConfiguration configuration)
{
    public IConfiguration Configuration { get; } = configuration;

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        services.AddDbContext<IdentityDbTHPContext>(options => options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));

        services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<IdentityDbTHPContext>()
            .AddDefaultTokenProviders();

        services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<IPostRepository, PostRepository>();
        services.AddScoped<IPostCategoryRepository, PostCategoryRepository>();
        services.AddScoped<IPostCategoryService, PostCategoryService>();
        services.AddScoped<IBannerRepository, BannerRepository>();
        services.AddScoped<IBannerService, BannerService>();
        services.AddScoped<IMenuService, MenuService>();
        services.AddScoped<IMenuRepository, MenuRepository>();
        services.AddScoped<IPartnerService, PartnerService>();
        services.AddScoped<IPartnerRepository, PartnerRepository>();
        services.AddScoped<IVideoService, VideoService>();
        services.AddScoped<IVideoRepository, VideoRepository>();
        services.AddScoped<IAttachmentService, AttachmentService>();
        services.AddScoped<IAttachmentRepository, AttachmentRepository>();
        services.AddScoped<IBlockService, BlockService>();
        services.AddScoped<IGalleryService, GalleryService>();
        services.AddScoped<ILocalizeService, LocalizeService>();
        services.AddScoped<ISettingRepository, SettingRepository>();
        services.AddScoped<ISettingService, SettingService>();
        services.AddScoped<INotificationService, NotificationService>();
        services.AddScoped<ILogService, LogService>();
        services.AddScoped<IContactService, ContactService>();

        #region Users
        services.AddUserService();
        #endregion
        services.AddScoped<IUserService, UserService>();

        services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

        services.AddTransient<ITelegramService, TelegramService>();
        services.AddTransient<IZaloAPI, ZaloAPI>();

        services.AddTransient<ICurrentUser, CurrentUser>();
        services.AddTransient<IEmailSender, EmailSender>();
        services.AddTransient<IHCAService, HCAService>();

        services.AddHttpClient<ITHPAuthen, ThpAuthen>();

        services.AddControllersWithViews();
        services.Configure<SettingOptions>(Configuration.GetSection(SettingOptions.Settings));
        services.AddCors();
        services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"] ?? string.Empty)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
        services.AddHttpClient();
        services.AddSession();
        services.AddRazorPages();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(origin => true).AllowCredentials());

        app.UseHttpsRedirection();

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseSession();
        app.UseStaticFiles();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            endpoints.MapRazorPages();
        });
    }
}
