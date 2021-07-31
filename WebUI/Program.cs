using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace WebUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }
        // "Server=103.216.113.32;Database=defzonen_data;User Id=defzonen_thp;Password=Rs366x*u;Trusted_Connection=False;MultipleActiveResultSets=true"
        // "Server=LAPTOP-IIRBIRMG\\SQLEXPRESS;Database=THPHome;Trusted_Connection=True;MultipleActiveResultSets=true"
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
