using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using Persistence;
using Microsoft.Extensions.Configuration;
using API.Examples;
using FluentValidation.AspNetCore;
using Application.Activities;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
IConfiguration _config = builder.Configuration;

// Add services to the container.
{
    builder.Services.AddControllers(
        opt =>
        {
            AuthorizationPolicy policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            opt.Filters.Add(new AuthorizeFilter(policy));
        }
    )
    .AddFluentValidation( //Adds FluentValidation from general assemblies
        config =>
        {
            config.RegisterValidatorsFromAssemblyContaining<Create>();
        }
    );
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddApplicationServices(_config); //Adds Mediator, Mapper, other services to container
    //builder.Services.AddSqliteServices(_config); //Adds Sqlite services to container
    builder.Services.AddSqlServerServices(_config);

    builder.Services.AddIdentityServices(_config);
}

WebApplication app = builder.Build();
/* IServiceScope _scope = app.Services.CreateScope();
IServiceProvider _serviceProvider = _scope.ServiceProvider;
DataContext _context = _serviceProvider.GetRequiredService<DataContext>();
UserManager<AppUser> _userManager = _serviceProvider.GetRequiredService<UserManager<AppUser>>();

//Migrates data automatically at each start
try
{
    if (!_context.Database.EnsureCreated())
    {
        await _context.Database.EnsureDeletedAsync();
        await _context.Database.EnsureCreatedAsync();
        System.Console.WriteLine("Database is not created, attempting to create and migrate");
        await _context.Database.MigrateAsync();
    }
    System.Console.WriteLine("Adding example data to database");
    await Seed.AddActivities(_context, _userManager);
}
catch (Exception ex)
{
    Console.WriteLine("Error en la creacion: \n" + ex.ToString());
    System.Console.WriteLine("Errores desde: " + ex.StackTrace);
}
finally
{ */
System.Console.WriteLine("Web API ready to serve");
/* } */
// Application configuration
{
    app.UseMiddleware<ExceptionMiddleware>();
    // Configure the HTTP request pipeline.
    /* if (app.Environment.IsDevelopment())
    { */
    /* app.UseDeveloperExceptionPage(); */
    app.UseSwagger();
    app.UseSwaggerUI();
    /* } */

    app.UseRouting();
    app.UseCors("CorsPolicy");
    //app.Urls.Add("http://localhost:5000");
    app.Urls.Add("http://20.49.104.17:5000");
    //app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}

