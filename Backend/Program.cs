using Backend.Data;
using Backend.Model;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
AddServices();
ConfigureSwagger();
AddDbContext();
InitializeDb();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Demo API V1");
    });
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

app.MapControllers();

app.Run();

void AddServices()
{
    builder.Services.AddControllers();

    // Register other services here if needed
}

void ConfigureSwagger()
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(option =>
    {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
            BearerFormat = "JWT"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
                new string[] { }
            }
        });
    });
}

void AddDbContext()
{
    builder.Services.AddDbContext<SausageContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Scoped
    );
    builder.Services.AddDbContext<SteakContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Scoped
    );
}

void InitializeDb()
{
    using var serviceScope = builder.Services.BuildServiceProvider().CreateScope();
    var sausageContext = serviceScope.ServiceProvider.GetRequiredService<SausageContext>();
    var steakContext = serviceScope.ServiceProvider.GetRequiredService<SteakContext>();

    if (!sausageContext.Sausages.Any())
    {
        for (int i = 1; i <= 20; i++)
        {
            var sausage = new Sausage
            {
                Name = $"Sausage {i}",
                Type = "sausage",
                Weight = GenerateRandomWeight(),
                Price = GenerateRandomPrice(),
                // Add other properties as needed
            };
            sausageContext.Sausages.Add(sausage);
        }
        sausageContext.SaveChanges();
    }

    if (!steakContext.Steaks.Any())
    {
        for (int i = 1; i <= 20; i++)
        {
            var steak = new Steak
            {
                Name = $"Steak {i}",
                Type = "steak",
                Weight = GenerateRandomWeight(),
                Price = GenerateRandomPrice(),
                // Add other properties as needed
            };
            steakContext.Steaks.Add(steak);
        }
        steakContext.SaveChanges();
    }
}

float GenerateRandomWeight()
{
    Random rand = new Random();
    return (float)(rand.NextDouble() * (1.0 - 0.1) + 0.1); // Random weight between 0.1 and 1.0
}

decimal GenerateRandomPrice()
{
    Random rand = new Random();
    return Math.Round((decimal)(rand.Next(10, 100)), 2); // Random price between 10 and 100
}
