using Repository.Configuration;
using Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Services
{
    public class FileManager : IFileManager
    {
        private readonly object _fileAccess = new object();

        public async Task<string> ReadFileAsync()
        {
            string str;
            lock (_fileAccess)
            {
                using (StreamReader r = new StreamReader(JSONConfig.FileName))
                {
                    str = r.ReadToEnd();
                };
            }
            return str;
        }

        public async Task WriteFileAsync(string str)
        {
            lock (_fileAccess)
            {
                using (FileStream fileStream = File.Open(JSONConfig.FileName, FileMode.Create))
                {
                    using (StreamWriter w = new StreamWriter(fileStream))
                    {
                        w.WriteLine(str);
                        w.Flush();
                    };
                };
            }
        }
    }
}
