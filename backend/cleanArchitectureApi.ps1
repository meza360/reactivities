Write-Output "Creating Web API with .NetCore"

dotnet new webapi -n "API"
dotnet new classlib -n "Application"
dotnet new classlib -n "Domain"
dotnet new classlib -n "Persistence"

dotnet add .\API reference .\Application
dotnet add .\API reference .\Persistence
dotnet add .\API package Swashbuckle.AspNetCore
dotnet add .\API package Microsoft.EntityFrameworkCore
dotnet add .\API package Microsoft.EntityFrameworkCore.Design
dotnet add .\API package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add .\API package MediatR.Extensions.Microsoft.DependencyInjection

dotnet add .\Application reference .\Persistence\
dotnet add .\Application reference .\Domain\
dotnet add .\Application package Microsoft.EntityFrameworkCore
dotnet add .\Application package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add .\Application package MediatR.Extensions.Microsoft.DependencyInjection

Remove-Item .\Application\Class1.cs
Remove-Item .\Domain\Class1.cs
Remove-Item .\Persistence\Class1.cs

dotnet add .\Persistence reference .\Domain\
dotnet add .\Persistence package Microsoft.NETCore.App
dotnet add .\Persistence package Microsoft.EntityFrameworkCore.Design

dotnet new sln
dotnet sln add .\API\
dotnet sln add .\Application\
dotnet sln add .\Domain\
dotnet sln add .\Persistence\