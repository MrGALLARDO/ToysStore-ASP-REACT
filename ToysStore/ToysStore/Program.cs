using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using ToysStore;
using ToysStore.ApiBehavior;
using ToysStore.Controllers.Filters;
using ToysStore.Filters;
using ToysStore.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
builder.Services.AddResponseCaching();
builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(FilterException));
    options.Filters.Add(typeof(ParseBadRequest));
}).ConfigureApiBehaviorOptions(BehaviorBadRequest.Parsing);

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddSingleton(provider =>
    new MapperConfiguration(config =>
    {
        var geometryFactory = provider.GetRequiredService<GeometryFactory>();
        config.AddProfile(new AutoMapperProfiles(geometryFactory));
    }).CreateMapper());

builder.Services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));

builder.Services.AddTransient<IStorageFiles, StorageAzure>();

builder.Services.AddDbContext<AplicationDbContext>(options =>
 options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection"),
 sqlServer => sqlServer.UseNetTopologySuite()));

builder.Services.AddCors(options =>
{
    var frontendURL = builder.Configuration.GetValue<string>("frontend_url");
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader()
        .WithExposedHeaders(new string[] { "quantityTotalRegisters" });
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ToysStoreApi", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ToysStoreApi v1"));
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();