using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Steak> Steaks { get; set; }
        public DbSet<Sausage> Sausages { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        // Constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Configure models in OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Sausage entity
            modelBuilder.Entity<Sausage>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Name).IsRequired().HasMaxLength(100);
                entity.Property(s => s.Type).IsRequired().HasMaxLength(50);
                entity.Property(s => s.Weight).IsRequired();
                entity.Property(s => s.Price).IsRequired();
            });

            // Configure Steak entity
            modelBuilder.Entity<Steak>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Name).IsRequired().HasMaxLength(100);
                entity.Property(s => s.Type).IsRequired().HasMaxLength(50);
                entity.Property(s => s.Weight).IsRequired();
                entity.Property(s => s.Price).IsRequired();
            });

            // Configure Order entity
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.Id);
                entity.Property(o => o.OrderSum).HasColumnType("decimal(18,2)");

                entity.HasMany(o => o.OrderItems)
                      .WithOne()
                      .HasForeignKey(oi => oi.OrderId)
                      .OnDelete(DeleteBehavior.Restrict); // Specify OnDelete behavior
            });

            // Configure OrderItem entity
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(oi => oi.Id);
                entity.Property(oi => oi.Name).IsRequired();
                entity.Property(oi => oi.Price).IsRequired();
                entity.Property(oi => oi.Quantity).IsRequired();
            });

            // Set decimal type for MerchItem price
            modelBuilder.Entity<OrderItem>()
                        .Property(u => u.Price)
                        .HasColumnType("decimal(18,2)");
        }
    }
}
