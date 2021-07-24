using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Infrastructure;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Repositories;
using ApplicationCore.Services;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Http;
using System;
using Microsoft.Net.Http.Headers;
using ExternalAPI.Interfaces;
using ApplicationCore.Interfaces;

namespace WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false).AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPostCategoryRepository, PostCategoryRepository>();
            services.AddScoped<IPostCategoryService, PostCategoryService>();
            services.AddScoped<IBannerRepository, BannerRepository>();
            services.AddScoped<IBannerService, BannerService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<IMenuRepository, MenuRepository>();

            services.AddControllersWithViews();
            services.AddSession();
            services.AddRazorPages();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
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

            const string spaPath = "/admin";
            if (env.IsDevelopment())
            {
                app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments(spaPath)
                                   || ctx.Request.Path.StartsWithSegments("/sockjs-node"),
                    client =>
                    {
                        client.UseSpa(spa =>
                        {
                            spa.Options.SourcePath = "ClientApp";
                            spa.UseReactDevelopmentServer(npmScript: "start");
                        });
                    });
            }
            else
            {
                app.Map(new PathString(spaPath), client =>
                {
                    // `https://github.com/dotnet/aspnetcore/issues/3147`
                    client.UseSpaStaticFiles(new StaticFileOptions()
                    {
                        OnPrepareResponse = ctx =>
                        {
                            if (ctx.Context.Request.Path.StartsWithSegments($"{spaPath}/static"))
                            {
                                // Cache all static resources for 1 year (versioned file names)
                                var headers = ctx.Context.Response.GetTypedHeaders();
                                headers.CacheControl = new CacheControlHeaderValue
                                {
                                    Public = true,
                                    MaxAge = TimeSpan.FromDays(365)
                                };
                            }
                            else
                            {
                                // Do not cache explicit `/index.html` or any other files.  See also: `DefaultPageStaticFileOptions` below for implicit "/index.html"
                                var headers = ctx.Context.Response.GetTypedHeaders();
                                headers.CacheControl = new CacheControlHeaderValue
                                {
                                    Public = true,
                                    MaxAge = TimeSpan.FromDays(0)
                                };
                            }
                        }
                    });

                    client.UseSpa(spa =>
                    {
                        spa.Options.SourcePath = "ClientApp";
                        spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions()
                        {
                            OnPrepareResponse = ctx => {
                                // Do not cache implicit `/index.html`.  See also: `UseSpaStaticFiles` above
                                var headers = ctx.Context.Response.GetTypedHeaders();
                                headers.CacheControl = new CacheControlHeaderValue
                                {
                                    Public = true,
                                    MaxAge = TimeSpan.FromDays(0)
                                };
                            }
                        };
                    });
                });
            }
        }
    }
}
