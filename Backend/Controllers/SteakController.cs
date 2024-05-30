using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SteakController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SteakController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Steak
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Steak>>> GetSteaks()
        {
            return await _context.Steaks.ToListAsync();
        }

        // GET: api/Steak/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Steak>> GetSteak(int id)
        {
            var steak = await _context.Steaks.FindAsync(id);

            if (steak == null)
            {
                return NotFound();
            }

            return steak;
        }

        // POST: api/Steak
        [HttpPost]
        public async Task<ActionResult<Steak>> PostSteak(Steak steak)
        {
            try
            {
                _context.Steaks.Add(steak);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetSteak), new { id = steak.Id }, steak);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // PUT: api/Steak/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSteak(int id, Steak steak)
        {
            if (id != steak.Id)
            {
                return BadRequest();
            }

            _context.Entry(steak).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SteakExists(id))
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

        // DELETE: api/Steak/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSteak(int id)
        {
            var steak = await _context.Steaks.FindAsync(id);
            if (steak == null)
            {
                return NotFound();
            }

            _context.Steaks.Remove(steak);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SteakExists(int id)
        {
            return _context.Steaks.Any(e => e.Id == id);
        }
    }
}
