using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class SausageContext : DbContext
    {
        public SausageContext(DbContextOptions<SausageContext> options) : base(options)
        {
        }

        public DbSet<Sausage> Sausages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<Sausage>().HasKey(s => s.Id);
            modelBuilder.Entity<Sausage>().Property(s => s.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Sausage>().Property(s => s.Type).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Sausage>().Property(s => s.Weight).IsRequired();
            modelBuilder.Entity<Sausage>().Property(s => s.Price).IsRequired();
        }
    }
}