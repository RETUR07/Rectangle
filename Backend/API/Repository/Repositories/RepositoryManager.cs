using Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private IRectangleRepository _rectangleRepository;
        public IRectangleRepository RectangleRepository
        {
            get
            {
                if (_rectangleRepository == null)
                    _rectangleRepository = new RectangleRepository();
                return _rectangleRepository;
            }
        }
    }
}
