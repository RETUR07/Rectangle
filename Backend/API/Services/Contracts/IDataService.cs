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
        Task<RectangleResponse> GetRectangleAsync();
        Task SaveRectangleAsync(RectangleForm rectangle);
    }
}
