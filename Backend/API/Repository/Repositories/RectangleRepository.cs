using Models.Models;
using Newtonsoft.Json;
using Repository.Configuration;
using Repository.Contracts;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class RectangleRepository : IRectangleRepository
    {
        private readonly object _fileAccess = new object();

        public async Task<Rectangle> GetRectangleAsync()
        {
            Rectangle rec;
            string json;

            lock (_fileAccess)
            {
                using (StreamReader r = new StreamReader(JSONConfig.FileName))
                {
                    json = r.ReadToEnd();
                };              
            }

            rec = JsonConvert.DeserializeObject<Rectangle>(json);
            return rec;
        }

        public async Task SaveRectangleAsync(Rectangle rectangle)
        {
            string json = JsonConvert.SerializeObject(rectangle);

            lock (_fileAccess)
            {
                using (FileStream fileStream = File.Open(JSONConfig.FileName, FileMode.Create))
                {
                    using (StreamWriter w = new StreamWriter(fileStream))
                    {
                        w.WriteLine(json);
                        w.Flush();
                    };
                };
            }
        }
    }
}
