using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Contracts
{
    public interface IRectangleRepository
    {
        public Task<Rectangle> GetRectangle();
        public Task SaveRectangle(Rectangle rectangle);
    }
}
