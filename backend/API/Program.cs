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

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
IConfiguration _config = builder.Configuration;

// Add services to the container.
{
    builder.Services.AddControllers()
    .AddFluentValidation( //Adds FluentValidation from general assemblies
        config => {
            config.RegisterValidatorsFromAssemblyContaining<Create>();
        }
    );
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddApplicationServices(_config); //Adds Mediator, Mapper, other services to container
    //builder.Services.AddSqliteServices(_config); //Adds Sqlite services to container
    builder.Services.AddSqlServerServices(_config);
}

WebApplication app = builder.Build(); 
IServiceScope scope = app.Services.CreateScope();
IServiceProvider serviceProvider = scope.ServiceProvider;
DataContext context = serviceProvider.GetRequiredService<DataContext>();

//Migrates data automatically at each start
try
{
    if(!context.Database.EnsureCreated()) 
    {
        await context.Database.EnsureDeletedAsync();
        await context.Database.EnsureCreatedAsync();
        System.Console.WriteLine("Database is not created, attempting to create and migrate");
        await context.Database.MigrateAsync();
    }
        System.Console.WriteLine("Adding example data to database");
        await Seed.AddActivities(context);
}
catch (Exception ex)
{
    Console.WriteLine("Error en la creacion: \n" + ex.ToString());
    System.Console.WriteLine("Errores desde: " + ex.StackTrace);
}
finally{
    System.Console.WriteLine("Web API ready to serve");
}
// Application configuration
{
    app.UseMiddleware<ExceptionMiddleware>();
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        /* app.UseDeveloperExceptionPage(); */
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseRouting();
    app.UseCors("CorsPolicy");
    /* app.Urls.Add("http://192.168.0.150:5000");
    app.Urls.Add("https://192.168.0.150:5001"); */
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}

