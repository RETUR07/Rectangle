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
        private readonly Mutex _fileAccess = new();
        private int readerCounter = 0;
        public async Task<string> ReadFileAsync()
        {
            if(readerCounter == 0)_fileAccess.WaitOne();
            readerCounter++;
            string str;
            using (StreamReader r = new StreamReader(JSONConfig.FileName))
            {
                str = r.ReadToEnd();
            };
            readerCounter--;
            if (readerCounter == 0) _fileAccess.ReleaseMutex();
            return str;
        }

        public async Task WriteFileAsync(string str)
        {
            _fileAccess.WaitOne();
            using (FileStream fileStream = File.Open(JSONConfig.FileName, FileMode.Create))
            {
                using (StreamWriter w = new StreamWriter(fileStream))
                {
                    w.WriteLine(str);
                    w.Flush();
                };
            };
            _fileAccess.ReleaseMutex();
            
        }
    }
}
