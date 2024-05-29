using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SausageController : ControllerBase
    {
        private readonly SausageContext _context;

        public SausageController(SausageContext context)
        {
            _context = context;
        }

        // GET: api/Sausage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sausage>>> GetSausages()
        {
            return await _context.Sausages.ToListAsync();
        }

        // GET: api/Sausage/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sausage>> GetSausage(int id)
        {
            var sausage = await _context.Sausages.FindAsync(id);

            if (sausage == null)
            {
                return NotFound();
            }

            return sausage;
        }

        // POST: api/Sausage
        [HttpPost]
        public async Task<ActionResult<Sausage>> PostSausage(Sausage sausage)
        {
            try
            {
                _context.Sausages.Add(sausage);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetSausage), new { id = sausage.Id }, sausage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // PUT: api/Sausage/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSausage(int id, Sausage sausage)
        {
            if (id != sausage.Id)
            {
                return BadRequest();
            }

            _context.Entry(sausage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SausageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Sausage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSausage(int id)
        {
            var sausage = await _context.Sausages.FindAsync(id);
            if (sausage == null)
            {
                return NotFound();
            }

            _context.Sausages.Remove(sausage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SausageExists(int id)
        {
            return _context.Sausages.Any(e => e.Id == id);
        }
    }
}
