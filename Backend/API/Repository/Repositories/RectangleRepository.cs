using Models.Models;
using Newtonsoft.Json;
using Repository.Contracts;

namespace Repository.Repositories
{
    public class RectangleRepository : IRectangleRepository
    {
        private readonly IFileManager _fileManager;
        public RectangleRepository(IFileManager fileManager)
        {
            _fileManager = fileManager;
        }
        public async Task<Rectangle> GetRectangleAsync()
        {
            Rectangle rec;
            string json = await _fileManager.ReadFileAsync();
            rec = JsonConvert.DeserializeObject<Rectangle>(json);
            return rec;
        }

        public async Task SaveRectangleAsync(Rectangle rectangle)
        {
            string json = JsonConvert.SerializeObject(rectangle);

            await _fileManager.WriteFileAsync(json);
        }
    }
}
