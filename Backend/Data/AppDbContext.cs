using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Steak> Steaks { get; set; }
        public DbSet<Sausage> Sausages { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Sausage entity
            modelBuilder.Entity<Sausage>().HasKey(s => s.Id);
            modelBuilder.Entity<Sausage>().Property(s => s.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Sausage>().Property(s => s.Type).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Sausage>().Property(s => s.Weight).IsRequired();
            modelBuilder.Entity<Sausage>().Property(s => s.Price).IsRequired();

            // Configure Steak entity
            modelBuilder.Entity<Steak>().HasKey(s => s.Id);
            modelBuilder.Entity<Steak>().Property(s => s.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Steak>().Property(s => s.Type).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Steak>().Property(s => s.Weight).IsRequired();
            modelBuilder.Entity<Steak>().Property(s => s.Price).IsRequired();

            // Configure Order entity
            modelBuilder.Entity<Order>().HasKey(o => o.Id);
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne()
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Restrict); // Specify OnDelete behavior

            // Configure OrderItem entity
            modelBuilder.Entity<OrderItem>().HasKey(oi => oi.Id);
            modelBuilder.Entity<OrderItem>().Property(oi => oi.Name).IsRequired();
            modelBuilder.Entity<OrderItem>().Property(oi => oi.Price).IsRequired();
            modelBuilder.Entity<OrderItem>().Property(oi => oi.Quantity).IsRequired();
        }
    }
}
