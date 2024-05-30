using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Model;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly SausageContext _sausageContext;
        private readonly SteakContext _steakContext;

        public SearchController(SausageContext sausageContext, SteakContext steakContext)
        {
            _sausageContext = sausageContext;
            _steakContext = steakContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Search(string query)
        {
            var sausageResults = await _sausageContext.Sausages
                .Where(s => s.Name.Contains(query) || s.Type.Contains(query))
                .Select(s => new
                {
                    Id = s.Id,
                    Name = s.Name,
                    Type = "sausage", // Ensure this matches the frontend logic
                    Weight = s.Weight,
                    Price = s.Price,
                    // Add more properties as needed
                })
                .ToListAsync();

            var steakResults = await _steakContext.Steaks
                .Where(s => s.Name.Contains(query) || s.Type.Contains(query))
                .Select(s => new
                {
                    Id = s.Id,
                    Name = s.Name,
                    Type = "steak", // Ensure this matches the frontend logic
                    Weight = s.Weight,
                    Price = s.Price,
                    // Add more properties as needed
                })
                .ToListAsync();

            var results = new List<object>();
            results.AddRange(sausageResults);
            results.AddRange(steakResults);

            return results;
        }
    }
}