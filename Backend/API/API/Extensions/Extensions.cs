using Repository.Contracts;
using Repository.Repositories;
using Services.Contracts;
using Services.Services;

namespace API.Extensions
{
    public static class Extensions
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IDataService, DataService>();
            services.AddSingleton<IRectangleRepository, RectangleRepository>();
            services.AddSingleton<IRepositoryManager, RepositoryManager>();
        }
    }
}
