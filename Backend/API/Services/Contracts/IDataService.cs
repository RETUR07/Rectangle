using Models.Models;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts
{
    public interface IDataService
    {
        public Task<RectangleResponse> GetRectangle();
        public Task SaveRectangle(RectangleForm rectangle);
    }
}
