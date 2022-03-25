using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using Services.DTO;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IDataService _dataService;
        public DataController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRectangle()
        {
            try
            {
                var res = await _dataService.GetRectangleAsync();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> SaveRectangle(RectangleForm rectangle)
        {
            try
            {
                await _dataService.SaveRectangleAsync(rectangle);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
