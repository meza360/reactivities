using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MediatR;

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
                    */
                });
            });

            services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly); //Mapper to edit easily activities
            services.AddMediatR(typeof(Application.Activities.ListAll.Handler).Assembly); //Mediator service to handle API calls

            return services;
        }
    }
}