using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using MoviesAPI;
using MoviesAPI.Data;
using MoviesAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string[] allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins")!.Split(",");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(optionsCORS =>
    {
        optionsCORS.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("total-records-count");
    });
});

builder.Services.AddSingleton(_ =>
    new BlobServiceClient(
        builder.Configuration["AzureStorage:ConnectionString"]
    ));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// cache
builder.Services.AddOutputCache(options =>
{
    options.DefaultExpirationTimeSpan = TimeSpan.FromSeconds(15); // nuestro cache vive 15s
});

// este DefaultConnection que usamos en name lo configuramos en appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer("name=DefaultConnection"));

builder.Services.AddAutoMapper(cfg =>
{

}, typeof(Program).Assembly);

//builder.Services.AddTransient<IFileStorage, AzureFileStorage>();
builder.Services.AddTransient<IFileStorage, LocalFileStorage>();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseOutputCache();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();

