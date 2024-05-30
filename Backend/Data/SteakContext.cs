using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class SteakContext : DbContext
    {
        public SteakContext(DbContextOptions<SteakContext> options) : base(options)
        {
        }

        public DbSet<Steak> Steaks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<Steak>().HasKey(s => s.Id);
            modelBuilder.Entity<Steak>().Property(s => s.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Steak>().Property(s => s.Type).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Steak>().Property(s => s.Weight).IsRequired();
            modelBuilder.Entity<Steak>().Property(s => s.Price).IsRequired();
        }
    }
}