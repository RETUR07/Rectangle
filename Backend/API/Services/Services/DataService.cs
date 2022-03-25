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
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public DataService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<RectangleResponse> GetRectangleAsync()
        {
            var rectangle = await _repositoryManager.RectangleRepository.GetRectangleAsync();
            return _mapper.Map<RectangleResponse>(rectangle);
        }

        public async Task SaveRectangleAsync(RectangleForm inputRectangle)
        {
            var rectangle = _mapper.Map<Rectangle>(inputRectangle);
            await _repositoryManager.RectangleRepository.SaveRectangleAsync(rectangle);
        }
    }
}
