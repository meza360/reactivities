
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Oracle.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
using API.Extensions;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices(builder.Configuration);



var app = builder.Build();


    
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();

    Console.WriteLine("Valor de creacion {0}", context.Database.EnsureCreated());
}
catch (Exception ex)
{
    Console.WriteLine("Error en la creacion: \n" + ex.ToString());
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("CorsPolicy");
app.Urls.Add("http://192.168.0.150:5000");
app.Urls.Add("https://192.168.0.150:5001");
//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
