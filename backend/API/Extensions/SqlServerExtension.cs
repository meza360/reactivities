using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API.Extensions
{
    public static class SqlServerExtension
    {
        public static IServiceCollection AddSqlServerServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(
                options => {
                    options.UseSqlServer(config.GetConnectionString("AzureSqlSrv01"));
                }
            );
            return services;
        }
    }
}