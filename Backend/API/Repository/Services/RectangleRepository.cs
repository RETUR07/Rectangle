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

namespace Repository.Services
{
    public class RectangleRepository : IRectangleRepository
    {
        static readonly object _fileAccess = new object();
        public RectangleRepository()
        {
        }

        public async Task<Rectangle> GetRectangle()
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

        public async Task SaveRectangle(Rectangle rectangle)
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
