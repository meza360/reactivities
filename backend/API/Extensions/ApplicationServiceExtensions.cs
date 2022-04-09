using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy =>{
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    /*
                    .WithOrigins("http://localhost:3000",
                    "http://localhost:19000",
                    "http://192.168.0.60:3000",
                    "http://192.168.0.55:19000",
                    "exp://192.168.0.55:19000",
                    "exp://192.168.0.60:19000",
                    "http://localhost:8100");
                    */
                });
            });

            services.AddDbContext<DataContext>(opt =>{
                opt.UseSqlServer(config.GetConnectionString("LocalSqlServer"));
            });

            services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

            services.AddMediatR(typeof(Application.Activities.ListAll.Handler).Assembly);
            

            return services;
        }
    }
}