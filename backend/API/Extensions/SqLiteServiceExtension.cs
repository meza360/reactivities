using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class SqLiteServiceExtension
    {
        public static IServiceCollection AddSqliteServices(this IServiceCollection services, IConfiguration configuration){
            services.AddDbContext<DataContext>(
                options => {
                    options.UseSqlite(configuration.GetConnectionString("SqLiteConnection"));
                }
            );
            return services;    
        }
    }
}