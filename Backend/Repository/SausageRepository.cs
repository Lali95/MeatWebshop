using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Model;

public class SausageRepository
{
    private readonly SausageContext _context;

    public SausageRepository(SausageContext context)
    {
        _context = context;
    }

    public async Task<List<Sausage>> GetAllSausagesAsync()
    {
        return await _context.Sausages.ToListAsync();
    }

    public async Task<Sausage> GetSausageByIdAsync(int id)
    {
        return await _context.Sausages.FindAsync(id);
    }

    public async Task AddSausageAsync(Sausage sausage)
    {
        _context.Sausages.Add(sausage);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateSausageAsync(Sausage sausage)
    {
        _context.Sausages.Update(sausage);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSausageAsync(int id)
    {
        var sausage = await _context.Sausages.FindAsync(id);
        if (sausage != null)
        {
            _context.Sausages.Remove(sausage);
            await _context.SaveChangesAsync();
        }
    }
}