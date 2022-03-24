using AutoMapper;
using Models.Models;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Mappers
{
    public class RectangleMapper : Profile
    {
        public RectangleMapper()
        {
            CreateMap<RectangleForm, Rectangle>();
            CreateMap<Rectangle, RectangleResponse>();
        }
    }
}
