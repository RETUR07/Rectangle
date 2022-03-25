using Repository.Contracts;
using Repository.Repositories;
using Repository.Services;
using Services.Contracts;
using Services.Services;

namespace API.Extensions
{
    public static class Extensions
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IDataService, DataService>();
            services.AddScoped<IRectangleRepository, RectangleRepository>();
            services.AddScoped<IRepositoryManager, RepositoryManager>();
            services.AddSingleton<IFileManager, FileManager>();
        }
    }
}
