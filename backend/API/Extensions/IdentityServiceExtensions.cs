using API.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Persistence;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(
                c => {
                    c.Password.RequiredLength = 4;
                    c.Password.RequireNonAlphanumeric = true;
                    c.Password.RequireDigit = true;
                    c.Password.RequireUppercase = true;
                    c.Password.RequireLowercase = true;
                }
            ).AddEntityFrameworkStores<DataContext>().AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                o => {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = TokenService.Key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddScoped<TokenService>();
            return services;
        }
    }
}