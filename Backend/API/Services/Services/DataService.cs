using AutoMapper;
using Models.Models;
using Repository.Contracts;
using Services.Contracts;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class DataService : IDataService
    {
        private readonly IRectangleRepository _rectangleRepository;
        private readonly IMapper _mapper;
        public DataService(IRectangleRepository rectangleRepository, IMapper mapper)
        {
            _rectangleRepository = rectangleRepository;
            _mapper = mapper;
        }
        public async Task<RectangleResponse> GetRectangle()
        {
            var rectangle = await _rectangleRepository.GetRectangle();
            return _mapper.Map<RectangleResponse>(rectangle);
        }

        public async Task SaveRectangle(RectangleForm inputRectangle)
        {
            var rectangle = _mapper.Map<Rectangle>(inputRectangle);
            await _rectangleRepository.SaveRectangle(rectangle);
        }
    }
}
